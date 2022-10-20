from flask import Blueprint, jsonify, request
from cinema.models import User
from cinema.utils.jwt import create_user_and_get_token, get_token_or_exception, token_required
from cinema.utils.validators import validate_auth_request_body
from cinema.utils.custom_errors import ResourceAlreadyExistsError, UnauthorizedError, ValidationError, ResourceDoesNotExistError


auth_bp = Blueprint("auth", __name__, url_prefix="auth")


@auth_bp.route('register', methods=(['POST']))
def register():
    body: dict = request.json
    try:
        valid_body = validate_auth_request_body(body)
        token = create_user_and_get_token(valid_body)
    except (ValidationError, ResourceAlreadyExistsError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify({"token": token})


@auth_bp.route('login', methods=(['POST']))
def login():
    body: dict = request.json
    try:
        valid_body = validate_auth_request_body(body)
        token = get_token_or_exception(valid_body)
    except (ValidationError, ResourceDoesNotExistError, UnauthorizedError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify({"token": token})


@auth_bp.route('user')
@token_required
def get_user(current_user: User):
    return jsonify({"username": current_user.username})
