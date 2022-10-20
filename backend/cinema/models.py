from dataclasses import dataclass
from datetime import datetime
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.exc import IntegrityError
from werkzeug.security import generate_password_hash

from cinema.utils.custom_errors import ForbiddenError, ResourceDoesNotExistError, ResourceAlreadyExistsError

db = SQLAlchemy()


@dataclass
class User(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    username: str = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    @staticmethod
    def get_user(id=None, username=None):
        if username:
            user = db.session.execute(
                db.select(User).filter_by(username=username)).scalar()
        if id:
            user = db.session.execute(
                db.select(User).filter_by(id=id)).scalar()

        if not user:
            raise ResourceDoesNotExistError("user")
        return user

    @staticmethod
    def create_user(valid_body: dict):
        try:
            username = valid_body.get("username")
            password = valid_body.get("password")

            new_user = User(username=username,
                            password=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError:
            raise ResourceAlreadyExistsError(
                "user", "username", new_user.username)

        return new_user


@dataclass
class Movie(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    title: str = db.Column(db.String, nullable=False, unique=True)
    director_id: int = db.Column(
        db.Integer, ForeignKey("director.id"), nullable=False)
    added: str = db.Column(db.DateTime, default=datetime.utcnow)
    added_by: int = db.Column(db.Integer, nullable=False)
    year: int = db.Column(db.Integer, nullable=False)
    rating: float = db.Column(db.Float, nullable=False)

    @staticmethod
    def get_movies():
        return db.session.execute(db.select(Movie)).scalars().all()

    @staticmethod
    def get_movie(id):
        movie = db.session.execute(
            db.select(Movie).filter_by(id=id)).scalars().first()
        if not movie:
            raise ResourceDoesNotExistError("movie")
        return movie

    @staticmethod
    def update_movie(current_user: User, id, valid_body: dict):
        movie: Movie = Movie.get_movie(id)
        if current_user.id != movie.added_by:
            raise ForbiddenError("This movie belongs to different user")

        updated_title = valid_body.get("title")
        updated_director_name = valid_body.get("director")
        updated_year = valid_body.get("year")
        updated_rating = valid_body.get("rating")

        movie.title = updated_title or movie.title
        movie.year = updated_year or movie.year
        movie.rating = updated_rating or movie.rating
        if updated_director_name:
            updated_director = Director.get_director(
                name=updated_director_name, create_if_404=True)
            movie.director_id = updated_director.id

        db.session.commit()
        return movie

    @staticmethod
    def delete_movie(current_user, id):
        movie = Movie.get_movie(id)
        if current_user.id != movie.added_by:
            raise ForbiddenError("This movie belongs to different user")

        db.session.delete(movie)
        db.session.commit()
        return movie

    @staticmethod
    def create_movie(current_user: User, valid_body: dict):
        try:
            title = valid_body.get("title")
            director_name = valid_body.get("director_name")
            year = valid_body.get("year")
            rating = valid_body.get("rating")

            director = Director.get_director(
                name=director_name, create_if_404=True)

            movie = Movie(title=title, added_by=current_user.id,
                          director_id=director.id, year=year, rating=rating)
            db.session.add(movie)
            db.session.commit()
        except IntegrityError:
            raise ResourceAlreadyExistsError("movie", "title", title)

        return movie


@dataclass
class Director(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String, unique=True, nullable=False)
    movies: List[Movie] = db.relationship("Movie", backref="director")

    @staticmethod
    def get_directors():
        return db.session.execute(db.select(Director)).scalars().all()

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
                director = Director.create_director(name)
            else:
                raise ResourceDoesNotExistError("director")

        return director

    @staticmethod
    def create_director(valid_body):
        try:
            director_name = valid_body.get("name")
            director = Director(name=director_name)
            db.session.add(director)
            db.session.commit()
        except IntegrityError:
            raise ResourceAlreadyExistsError("director", "name", director_name)

        return director
