from ariadne import convert_kwargs_to_snake_case
from cinema.models.director import Director


def resolve_directors(obj, info, limit=None, offset=None):
    return Director.get_directors(limit, offset)


def resolve_directors_count(obj, info):
    return Director.count_directors()


@convert_kwargs_to_snake_case
def resolve_director(obj, info, director_id):
    return Director.get_director(id=director_id)
