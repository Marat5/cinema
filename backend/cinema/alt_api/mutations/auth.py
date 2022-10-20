from cinema.alt_api.validation_maps.auth import auth_graphql_params_to_rest_body
from cinema.utils.jwt import create_user_and_get_token
from cinema.utils.validators import validate_auth_request_body


def resolve_register(obj, info, username, password):
    body_for_validation = auth_graphql_params_to_rest_body(username, password)
    validate_auth_request_body(body_for_validation)

    return create_user_and_get_token(username, password)
