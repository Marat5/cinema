from ariadne import convert_kwargs_to_snake_case
from cinema.models import Director
from cinema.utils.jwt import token_required
from cinema.utils.validators import map_graphql_resolver_args_to_rest_body, validate_create_director_request_body


@token_required(is_graphql=True)
@convert_kwargs_to_snake_case
def resolve_create_director(current_user, obj, info, name):
    body_for_validation = map_graphql_resolver_args_to_rest_body(name=name)
    validate_create_director_request_body(body_for_validation)

    return Director.create_director(name)
