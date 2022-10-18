from flask import Blueprint, jsonify, request
from cinema.models import User
from werkzeug.security import check_password_hash, generate_password_hash
from cinema.utils.jwt import encode_jwt, token_required
from cinema.utils.validators import validate_auth_request_body
from cinema.utils.custom_errors import ResourceAlreadyExistsError, ValidationError, ResourceDoesNotExistError
from cinema.utils.db_helper import dbh_user


auth_bp = Blueprint("auth", __name__, url_prefix="auth")


@auth_bp.route('register', methods=(['POST']))
def register():
    body: dict = request.json
    try:
        validate_auth_request_body(body)
        username = body.get("username")
        password = body.get("password")

        new_user = User(username=username,
                        password=generate_password_hash(password))
        dbh_user.add_user(new_user)

        token = encode_jwt(new_user.id)
    except (ValidationError, ResourceAlreadyExistsError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify({"token": token})


@auth_bp.route('login', methods=(['POST']))
def login():
    body: dict = request.json
    try:
        validate_auth_request_body(body)
        username = body.get("username")
        password = body.get("password")

        user = dbh_user.get_user(username=username)

        if not check_password_hash(user.password, password):
            return jsonify({"message": "The password is incorrect"}), 401

        token = encode_jwt(user.id)
    except (ValidationError, ResourceDoesNotExistError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify({"token": token})


@auth_bp.route('user')
@token_required
def get_user(current_user):
    return jsonify({"username": current_user.username})
