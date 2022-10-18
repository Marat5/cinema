from ariadne import convert_kwargs_to_snake_case
from cinema.utils.custom_errors import ResourceAlreadyExistsError

from cinema.utils.db_helper import dbh_director


@convert_kwargs_to_snake_case
def resolve_add_director(obj, info, name):
    try:
        director = dbh_director.add_director(name)

        payload = {
            "success": True,
            "director": director
        }
    except ResourceAlreadyExistsError as e:
        payload = {
            "success": False,
            "errors": [str(e)]
        }

    return payload
