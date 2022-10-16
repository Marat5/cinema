from datetime import datetime, timedelta
from functools import wraps
from sqlalchemy.exc import IntegrityError
from flask import Blueprint, jsonify, request, current_app
import jwt
from cinema.database import ResourceDoesNotExistError, User, db_helper as dbh
from werkzeug.security import check_password_hash, generate_password_hash
from cinema.validators import ValidationError, validate_auth_request_body


bp = Blueprint("auth", __name__, url_prefix="auth")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        # Check that jwt is passed in the request header
        if 'Authorization' in request.headers and "Bearer " in request.headers['Authorization']:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Decode the payload to fetch the stored details
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"])

            current_user = dbh.get_user(data['id'])
        except:
            return jsonify({
                'message': 'Token is invalid!'
            }), 401
        # returns the current logged in user to the routes
        return f(current_user, *args, **kwargs)

    return decorated


def encode_jwt(user_id):
    return jwt.encode(
        {"id": user_id, "exp": datetime.utcnow() + timedelta(minutes=40)}, current_app.config["SECRET_KEY"])


@bp.route('register', methods=(['POST']))
def register():
    body: dict = request.json
    try:
        validate_auth_request_body(body)
        username = body.get("username")
        password = body.get("password")

        new_user = User(username=username,
                        password=generate_password_hash(password))
        dbh.add_user(new_user)

        token = encode_jwt(new_user.id)
    except ValidationError as e:
        return jsonify({"message": str(e)}), e.code
    except IntegrityError as e:
        return jsonify({"message": f"User {new_user.username} already exists"}), 409

    return jsonify({"token": token})


@bp.route('login', methods=(['POST']))
def login():
    body: dict = request.json
    try:
        validate_auth_request_body(body)
        username = body.get("username")
        password = body.get("password")

        user = dbh.get_user(username=username)

        if not check_password_hash(user.password, password):
            return jsonify({"message": "The password is incorrect"}), 401

        token = encode_jwt(user.id)
    except (ValidationError, ResourceDoesNotExistError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify({"token": token})


@bp.route('user')
@token_required
def get_user(current_user):
    return jsonify({"username": current_user.username})
