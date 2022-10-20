from ariadne import convert_kwargs_to_snake_case
from cinema.models import Director


def resolve_directors(obj, info):
    return Director.get_directors()


@convert_kwargs_to_snake_case
def resolve_director(obj, info, director_id):
    return Director.get_director(id=director_id)
