from dataclasses import dataclass
from typing import List
from sqlalchemy import desc
from sqlalchemy.exc import IntegrityError

from cinema.utils.custom_errors import ResourceDoesNotExistError, ResourceAlreadyExistsError
from cinema.utils.validators import CreateDirectorValidBody
from cinema.models.db import db


@dataclass
class Director(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String, unique=True, nullable=False)
    movies: List = db.relationship("Movie", backref="director")
    movies_watched: int = db.Column(db.Integer, nullable=False)
    average_rating: float = db.Column(db.Float, nullable=False)

    @staticmethod
    def get_directors(limit, offset):
        return db.session.execute(db.select(Director).limit(limit).offset(offset).order_by(desc(Director.average_rating))).scalars().all()

    @staticmethod
    def count_directors():
        return db.session.execute(db.select(db.func.count()).select_from(db.select(Director).subquery())).scalar_one()

    @staticmethod
    def get_director(id=None, name=None, create_if_404=False):
        if id:
            director = db.session.execute(
                db.select(Director).filter_by(id=id)).scalars().first()
        else:
            director = db.session.execute(
                db.select(Director).filter_by(name=name)).scalars().first()

        if not director:
            if create_if_404:
                director = Director.create_director({"name": name})
            else:
                raise ResourceDoesNotExistError("director", "name")

        return director

    @staticmethod
    def create_director(valid_body: CreateDirectorValidBody):
        try:
            director_name = valid_body.get("name")
            director = Director(name=director_name,
                                average_rating=0, movies_watched=0)
            db.session.add(director)
            db.session.commit()
        except IntegrityError:
            raise ResourceAlreadyExistsError("director", "name", director_name)

        return director

    @staticmethod
    def update_director_after_movies_change(director: "Director"):
        director.movies_watched = len(director.movies)
        total_rating = 0
        for m in director.movies:
            total_rating += m.rating
        director.average_rating = total_rating / director.movies_watched
        db.session.commit()
