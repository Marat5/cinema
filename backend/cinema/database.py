from dataclasses import dataclass
from datetime import datetime
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey


db = SQLAlchemy()


@dataclass
class User(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    username: str = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)


@dataclass
class Movie(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    title: str = db.Column(db.String, nullable=False, unique=True)
    director: int = db.Column(
        db.Integer, ForeignKey("director.id"), nullable=False)
    added: str = db.Column(db.DateTime, default=datetime.utcnow)
    added_by: int = db.Column(db.Integer, nullable=False)
    year: int = db.Column(db.Integer, nullable=False)


@dataclass
class Director(db.Model):
    id: int
    name: str
    movies: List[Movie]

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    movies = db.relationship("Movie")


class ResourceDoesNotExistError(Exception):
    def __init__(self, resource_name: str) -> None:
        self.message = f"{resource_name.capitalize()} does not exist"

    def __str__(self) -> str:
        return self.message
    code = 404


class DBHelper():
    # Auth
    def get_user(self, id=None, username=None):
        if username:
            user = db.session.execute(
                db.select(User).filter_by(username=username)).scalar()
        if id:
            user = db.session.execute(
                db.select(User).filter_by(id=id)).scalar()

        if not user:
            raise ResourceDoesNotExistError("user")
        return user

    def add_user(self, user: User):
        db.session.add(user)
        db.session.commit()
        return user

    # Movies
    def get_directors(self):
        return db.session.execute(db.select(Director)).scalars().all()

    def get_director_id(self, director_name):
        director = db.session.execute(
            db.select(Director).filter_by(name=director_name)).scalars().first()

        if not director:
            director = Director(name=director_name)
            db.session.add(director)
            db.session.commit()

        return director.id

    def get_movies(self):
        return db.session.execute(db.select(Movie)).scalars().all()

    def get_movie(self, id):
        return db.session.execute(
            db.select(Movie).filter_by(id=id)).scalars().first()

    def update_movie(self, id, title, director_name, year):
        movie = db_helper.get_movie(id)
        movie.title = title
        movie.director = db_helper.get_director_id(director_name)
        movie.year = year

        db.session.commit()
        return movie

    def delete_movie(self, id):
        movie = db_helper.get_movie(id)
        db.session.delete(movie)
        db.session.commit()

    def add_movie(self, title, added_by, director_id, year):
        db.session.add(Movie(title=title, added_by=added_by,
                             director=director_id, year=year))
        db.session.commit()


db_helper = DBHelper()
