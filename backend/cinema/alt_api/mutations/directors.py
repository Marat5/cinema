from ariadne import convert_kwargs_to_snake_case

from cinema.utils.db_helper import dbh_director
from cinema.utils.jwt import token_required


@token_required(is_graphql=True)
@convert_kwargs_to_snake_case
def resolve_add_director(current_user, obj, info, name):
    return dbh_director.add_director(name)
