# Always use this classes to access resources in database
from cinema.models import db, User, Director, Movie
from cinema.utils.custom_errors import ResourceAlreadyExistsError, ResourceDoesNotExistError
from sqlalchemy.exc import IntegrityError


class DBHelper_User():
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

    def create_user(self, user: User):
        try:
            db.session.add(user)
            db.session.commit()
        except IntegrityError:
            raise ResourceAlreadyExistsError("user", "username", user.username)

        return user


class DBHelper_Director():
    def get_directors(self):
        return db.session.execute(db.select(Director)).scalars().all()

    def get_director(self, id=None, name=None, create_if_404=False):
        if id:
            director = db.session.execute(
                db.select(Director).filter_by(id=id)).scalars().first()
        else:
            director = db.session.execute(
                db.select(Director).filter_by(name=name)).scalars().first()

        if not director:
            if create_if_404:
                director = self.create_director(name)
            else:
                raise ResourceDoesNotExistError("director")

        return director

    def create_director(self, director_name):
        try:
            director = Director(name=director_name)
            db.session.add(director)
            db.session.commit()
        except IntegrityError:
            raise ResourceAlreadyExistsError("director", "name", director_name)

        return director


class DBHelper_Movie():
    def get_movies(self):
        return db.session.execute(db.select(Movie)).scalars().all()

    def get_movie(self, id):
        movie = db.session.execute(
            db.select(Movie).filter_by(id=id)).scalars().first()
        if not movie:
            raise ResourceDoesNotExistError("movie")
        return movie

    def update_movie(self, id, title, director_name, year):
        movie = dbh_movie.get_movie(id)

        movie.title = title or movie.title
        movie.year = year or movie.year
        if director_name:
            movie.director_id = dbh_director.get_director(
                name=director_name, create_if_404=True).id

        db.session.commit()
        return movie

    def delete_movie(self, id):
        movie = dbh_movie.get_movie(id)
        db.session.delete(movie)
        db.session.commit()
        return movie

    def create_movie(self, title, added_by, director_id, year, rating):
        try:
            movie = Movie(title=title, added_by=added_by,
                          director_id=director_id, year=year, rating=rating)
            db.session.add(movie)
            db.session.commit()
        except IntegrityError:
            raise ResourceAlreadyExistsError("movie", "title", title)

        return movie


dbh_user = DBHelper_User()
dbh_movie = DBHelper_Movie()
dbh_director = DBHelper_Director()
