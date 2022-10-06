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
