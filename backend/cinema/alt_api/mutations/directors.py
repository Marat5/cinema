from ariadne import convert_kwargs_to_snake_case
from cinema.alt_api.validation_maps.directors import add_director_graphql_params_to_rest_body

from cinema.utils.db_helper import dbh_director
from cinema.utils.jwt import token_required
from cinema.utils.validators import validate_add_director_request_body


@token_required(is_graphql=True)
@convert_kwargs_to_snake_case
def resolve_add_director(current_user, obj, info, name):
    body_for_validation = add_director_graphql_params_to_rest_body(name)
    validate_add_director_request_body(body_for_validation)

    return dbh_director.add_director(name)
