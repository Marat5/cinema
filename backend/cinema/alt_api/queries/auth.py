from cinema.alt_api.validation_maps.auth import auth_graphql_params_to_rest_body
from cinema.models import User
from cinema.utils.jwt import get_token_or_exception, token_required
from cinema.utils.validators import validate_auth_request_body


def resolve_login(obj, info, username, password):
    body_for_validation = auth_graphql_params_to_rest_body(username, password)
    validate_auth_request_body(body_for_validation)

    return get_token_or_exception(username, password)


@token_required(is_graphql=True)
def resolve_user(current_user: User, obj, info):
    return current_user
