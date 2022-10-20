from cinema.utils.jwt import create_user_and_get_token


def resolve_register(obj, info, username, password):
    return create_user_and_get_token(username, password)
