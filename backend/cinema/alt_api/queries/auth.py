from cinema.models import User
from cinema.utils.jwt import token_required


@token_required(is_graphql=True)
def resolve_user(current_user: User, obj, info):
    return current_user
