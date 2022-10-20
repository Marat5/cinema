from cinema.models import User
from cinema.utils.jwt import get_token_or_exception, token_required


def resolve_login(obj, info, username, password):
    return get_token_or_exception(username, password)


@token_required(is_graphql=True)
def resolve_user(current_user: User, obj, info):
    return current_user
