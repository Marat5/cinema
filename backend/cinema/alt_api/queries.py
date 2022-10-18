from ariadne import convert_kwargs_to_snake_case
from cinema.utils.custom_errors import ResourceDoesNotExistError
from cinema.utils.db_helper import dbh_director


def resolve_directors(obj, info):
    try:
        directors = dbh_director.get_directors()
        payload = {
            "success": True,
            "directors": directors
        }
    except Exception as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }
    return payload


@convert_kwargs_to_snake_case
def resolve_director(obj, info, director_id):
    try:
        director = dbh_director.get_director(director_id)
        payload = {
            "success": True,
            "director": director
        }

    except ResourceDoesNotExistError:
        payload = {
            "success": False,
            "errors": [f"Director item matching id {director_id} not found"]
        }

    return payload
