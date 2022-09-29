from datetime import datetime, timedelta
from functools import wraps
from flask import Blueprint, jsonify, request, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from cinema.db import get_db
import jwt

bp = Blueprint("auth", __name__, url_prefix="/api/auth")


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

        db = get_db()

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"])
            current_user = db.execute(
                'SELECT * FROM user WHERE id = ?', (str(data['id']))
            ).fetchone()

            if current_user is None:
                raise Exception(
                    "User with is provided in jwt doesn't exist (was deleted)")
        except:
            return jsonify({
                'message': 'Token is invalid!'
            }), 401
        # returns the current logged in users contex to the routes
        return f(current_user, *args, **kwargs)

    return decorated


@bp.route('/register', methods=(['POST']))
def register():
    username = request.json['username']
    password = request.json['password']
    db = get_db()

    if not username:
        return jsonify({"error": 'Username is required.'}), 400
    elif not password:
        return jsonify({"error": 'Password is required.'}), 400

    try:
        db.execute(
            "INSERT INTO user (username, password) VALUES (?, ?)",
            (username, generate_password_hash(password)),
        )
        db.commit()
    except db.IntegrityError:
        return jsonify({"error": f"User {username} is already registered."}), 409

    user = db.execute(
        'SELECT * FROM user WHERE username = ?', (username,)
    ).fetchone()

    token = jwt.encode(
        {"id": user["id"], "exp": datetime.utcnow() + timedelta(minutes=40)}, current_app.config["SECRET_KEY"])
    return jsonify({"token": token})


@bp.route('login', methods=(['POST']))
def login():
    username = request.json['username']
    password = request.json['password']
    db = get_db()

    user = db.execute(
        'SELECT * FROM user WHERE username = ?', (username,)
    ).fetchone()

    if user is None:
        return jsonify({"error": f"User {username} does not exist."}), 404
    elif not check_password_hash(user['password'], password):
        return jsonify({"error": "The password is incorrect"}), 401

    token = jwt.encode(
        {"id": user["id"], "exp": datetime.utcnow() + timedelta(minutes=40)}, current_app.config["SECRET_KEY"])
    return jsonify({"token": token})


@bp.route('user')
@token_required
def get_user(current_user):
    return jsonify({"username": current_user["username"]})
