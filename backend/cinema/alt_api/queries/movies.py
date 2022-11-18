from ariadne import convert_kwargs_to_snake_case
from cinema.models.movie import Movie


@convert_kwargs_to_snake_case
def resolve_movies(obj, info, order_by=None, limit=None):
    return Movie.get_movies(order_by, limit)


def resolve_movie(obj, info, id):
    return Movie.get_movie(id)
