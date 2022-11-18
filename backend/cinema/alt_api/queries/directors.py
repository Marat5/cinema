from ariadne import convert_kwargs_to_snake_case
from cinema.models.director import Director


def resolve_directors(obj, info, limit, offset):
    return {
        "total_count": Director.count_directors(),
        "directors": Director.get_directors(limit, offset)
    }


@convert_kwargs_to_snake_case
def resolve_director(obj, info, director_id):
    return Director.get_director(id=director_id)
