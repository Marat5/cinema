from datetime import datetime, timedelta
from functools import wraps
from flask import Blueprint, jsonify, request, current_app
import jwt
from cinema.database import db, User
from werkzeug.security import generate_password_hash, check_password_hash


bp = Blueprint("auth", __name__, url_prefix="auth")


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'Authorization' in request.headers and "Bearer " in request.headers['Authorization']:
            token = request.headers['Authorization'].split(" ")[1]
        # return 401 if token is not passed
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"])

            current_user = db.session.execute(
                db.select(User, data['id'])).scalar()

            if current_user is None:
                raise Exception(
                    "User with is provided in jwt doesn't exist (was deleted)")
        except:
            return jsonify({
                'message': 'Token is invalid!'
            }), 401
        # returns the current logged in user to the routes
        return f(current_user, *args, **kwargs)

    return decorated


@bp.route('register', methods=(['POST']))
def register():
    username = request.json['username']
    password = request.json['password']

    if not username:
        return jsonify({"error": 'Username is required.'}), 400
    elif not password:
        return jsonify({"error": 'Password is required.'}), 400

    new_user = User(username=username,
                    password=generate_password_hash(password))
    try:
        db.session.add(new_user)
        db.session.commit()
    except:
        return jsonify({"error": f"User {new_user.username} already exists"}), 409

    token = jwt.encode(
        {"id": new_user.id, "exp": datetime.utcnow() + timedelta(minutes=40)}, current_app.config["SECRET_KEY"])

    return jsonify({"token": token})


@bp.route('login', methods=(['POST']))
def login():
    username = request.json['username']
    password = request.json['password']

    user = db.session.execute(
        db.select(User).filter_by(username=username)).scalar()

    if user is None:
        return jsonify({"error": f"User {username} does not exist."}), 404
    elif not check_password_hash(user.password, password):
        return jsonify({"error": "The password is incorrect"}), 401

    token = jwt.encode(
        {"id": user.id, "exp": datetime.utcnow() + timedelta(minutes=40)}, current_app.config["SECRET_KEY"])
    return jsonify({"token": token})


@bp.route('user')
@token_required
def get_user(current_user):
    return jsonify({"username": current_user.username})
