from cinema.utils.jwt import create_user_and_get_token, get_token_or_exception
from cinema.utils.validators import map_graphql_resolver_args_to_rest_body, validate_auth_request_body


def resolve_login(obj, info, username, password):
    body_for_validation = map_graphql_resolver_args_to_rest_body(
        username=username, password=password)
    valid_body = validate_auth_request_body(body_for_validation)

    token = get_token_or_exception(valid_body)
    return {"token": token}


def resolve_register(obj, info, username, password):
    body_for_validation = map_graphql_resolver_args_to_rest_body(
        username=username, password=password)
    valid_body = validate_auth_request_body(body_for_validation)
    token = create_user_and_get_token(valid_body)

    return {"token": token}
