from ariadne import convert_kwargs_to_snake_case
from cinema.alt_api.validation_maps.directors import create_director_graphql_params_to_rest_body

from cinema.utils.db_helper import dbh_director
from cinema.utils.jwt import token_required
from cinema.utils.validators import validate_create_director_request_body


@token_required(is_graphql=True)
@convert_kwargs_to_snake_case
def resolve_create_director(current_user, obj, info, name):
    body_for_validation = create_director_graphql_params_to_rest_body(name)
    validate_create_director_request_body(body_for_validation)

    return dbh_director.create_director(name)
