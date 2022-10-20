

from cinema.models import Movie


def resolve_movies(obj, info):
    return Movie.get_movies()


def resolve_movie(obj, info, id):
    return Movie.get_movie(id)
