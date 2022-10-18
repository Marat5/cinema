from functools import wraps
from flask import request, jsonify, current_app
import jwt
from datetime import datetime, timedelta
from cinema.utils.db_helper import dbh_user


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Check that jwt is passed in the request header
        if 'Authorization' in request.headers and "Bearer " in request.headers['Authorization']:
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401

        try:
            # Decode the payload to fetch the stored details
            data = jwt.decode(
                token, current_app.config["SECRET_KEY"], algorithms=["HS256"])

            current_user = dbh_user.get_user(data['id'])
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
