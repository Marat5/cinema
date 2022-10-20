from ariadne import convert_kwargs_to_snake_case
from cinema.utils.db_helper import dbh_director


def resolve_directors(obj, info):
    return dbh_director.get_directors()


@convert_kwargs_to_snake_case
def resolve_director(obj, info, director_id):
    return dbh_director.get_director(id=director_id)
