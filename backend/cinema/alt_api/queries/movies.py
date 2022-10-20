from cinema.utils.db_helper import dbh_movie


def resolve_movies(obj, info):
    return dbh_movie.get_movies()
