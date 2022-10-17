# Always use this classes to access resources in database
from cinema.models import db, User, Director, Movie
from cinema.utils.custom_errors import ResourceDoesNotExistError


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

    def add_user(self, user: User):
        db.session.add(user)
        db.session.commit()
        return user


class DBHelper_Director():
    def get_directors(self):
        return db.session.execute(db.select(Director)).scalars().all()

    def get_director(self, id):
        director = db.session.execute(
            db.select(Director).filter_by(id=id)).scalars().first()
        if not director:
            raise ResourceDoesNotExistError("director")
        return director

    def get_director_id(self, director_name):
        director = db.session.execute(
            db.select(Director).filter_by(name=director_name)).scalars().first()

        if not director:
            director = Director(name=director_name)
            db.session.add(director)
            db.session.commit()

        return director.id


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
            movie.director = dbh_director.get_director_id(director_name)

        db.session.commit()
        return movie

    def delete_movie(self, id):
        movie = dbh_movie.get_movie(id)
        db.session.delete(movie)
        db.session.commit()
        return movie

    def add_movie(self, title, added_by, director_id, year):
        movie = Movie(title=title, added_by=added_by,
                      director=director_id, year=year)
        db.session.add(movie)
        db.session.commit()
        return movie


dbh_user = DBHelper_User()
dbh_movie = DBHelper_Movie()
dbh_director = DBHelper_Director()
