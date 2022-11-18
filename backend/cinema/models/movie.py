from dataclasses import dataclass
from datetime import datetime
from sqlalchemy import ForeignKey, desc, event
from sqlalchemy.exc import IntegrityError

from cinema.models.director import Director
from cinema.models.user import User
from cinema.utils.custom_errors import ForbiddenError, ResourceDoesNotExistError, ResourceAlreadyExistsError
from cinema.utils.validators import CreateMovieValidBody, UpdateMovieValidBody
from cinema.models.db import db
from cinema.utils.default_db_data import MOVIES


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
    def get_movies(order_by=None, limit=None):
        return db.session.execute(db.select(Movie).limit(limit).order_by(desc(order_by))).scalars().all()

    @staticmethod
    def get_movie(id):
        movie = db.session.execute(
            db.select(Movie).filter_by(id=id)).scalars().first()
        if not movie:
            raise ResourceDoesNotExistError("movie", "id")
        return movie

    @staticmethod
    def update_movie(current_user: User, id, valid_body: UpdateMovieValidBody):
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
        Director.update_director_after_movies_change(updated_director)
        return movie

    @staticmethod
    def delete_movie(current_user, id):
        movie = Movie.get_movie(id)
        director = Director.get_director(
            id=movie.director_id)

        if current_user.id != movie.added_by:
            raise ForbiddenError("This movie belongs to different user")

        db.session.delete(movie)
        db.session.commit()

        Director.update_director_after_movies_change(director)
        return movie

    @staticmethod
    def create_movie(current_user: User, valid_body: CreateMovieValidBody):
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

            Director.update_director_after_movies_change(director)
        except IntegrityError:
            raise ResourceAlreadyExistsError("movie", "title", title)

        return movie


@event.listens_for(Movie.__table__, 'after_create')
def create_initial_movies(*args, **kwargs):
    superuser = User.get_user(username="Superuser")
    for movie in MOVIES:
        Movie.create_movie(superuser, movie)
