from dataclasses import dataclass
from datetime import datetime
from typing import List
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey

from cinema.utils.custom_errors import ResourceDoesNotExistError

db = SQLAlchemy()


@dataclass
class User(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    username: str = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

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


@dataclass
class Movie(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    title: str = db.Column(db.String, nullable=False, unique=True)
    director_id: int = db.Column(
        db.Integer, ForeignKey("director.id"), nullable=False)
    added: str = db.Column(db.DateTime, default=datetime.utcnow)
    added_by: int = db.Column(db.Integer, nullable=False)
    year: int = db.Column(db.Integer, nullable=False)


@dataclass
class Director(db.Model):
    id: int = db.Column(db.Integer, primary_key=True)
    name: str = db.Column(db.String, unique=True, nullable=False)
    movies: List[Movie] = db.relationship("Movie", backref="director")
