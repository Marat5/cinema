from dataclasses import dataclass
from werkzeug.security import generate_password_hash
from cinema.utils.custom_errors import ResourceDoesNotExistError, ResourceAlreadyExistsError
from cinema.utils.validators import AuthValidBody
from sqlalchemy.exc import IntegrityError
from sqlalchemy import event
from cinema.models.db import db
from cinema.utils.default_db_data import USERS


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
            if not user:
                raise ResourceDoesNotExistError("user", "username")
        if id:
            user = db.session.execute(
                db.select(User).filter_by(id=id)).scalar()
            if not user:
                raise ResourceDoesNotExistError("user", "id")
        return user

    @staticmethod
    def create_user(valid_body: AuthValidBody):
        try:
            username = valid_body.get("username")
            password = valid_body.get("password")

            new_user = User(username=username,
                            password=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
        except IntegrityError as e:
            raise ResourceAlreadyExistsError(
                "user", "username", new_user.username)

        return new_user


@event.listens_for(User.__table__, 'after_create')
def create_initial_users(*args, **kwargs):
    for user in USERS:
        User.create_user(user)
