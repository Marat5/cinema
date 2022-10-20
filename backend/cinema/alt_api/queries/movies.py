

from cinema.models import Movie


def resolve_movies(obj, info):
    return Movie.get_movies()
