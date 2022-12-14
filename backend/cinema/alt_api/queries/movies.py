from ariadne import convert_kwargs_to_snake_case
from cinema.models.movie import Movie


@convert_kwargs_to_snake_case
def resolve_movies(obj, info, order_by=None, limit=None, offset=None):
    return Movie.get_movies(order_by, limit, offset)


def resolve_movies_count(obj, info):
    return Movie.count_movies()


def resolve_movie(obj, info, movieId):
    return Movie.get_movie(movieId)
