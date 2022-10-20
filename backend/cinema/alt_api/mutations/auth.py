from cinema.utils.jwt import create_user_and_get_token
from cinema.utils.validators import map_graphql_resolver_args_to_rest_body, validate_auth_request_body


def resolve_register(obj, info, username, password):
    body_for_validation = map_graphql_resolver_args_to_rest_body(
        username=username, password=password)
    validate_auth_request_body(body_for_validation)

    return {"token": create_user_and_get_token(username, password)}
