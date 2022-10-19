from functools import wraps
from flask import request, jsonify, current_app
import jwt
from datetime import datetime, timedelta
from cinema.utils.db_helper import dbh_user


def token_required(original_f=None, *, is_graphql=False):
    # We call it with is_graphql flag to raise the auth exception unlike rest api where we return json
    # No additional arguments are required for using it with rest api

    def _decorate(f):
        @wraps(f)
        def wrapped_f(*args, **kwargs):
            token = None
            # Check that jwt is passed in the request header
            if 'Authorization' in request.headers and "Bearer " in request.headers['Authorization']:
                token = request.headers['Authorization'].split(" ")[1]
            if not token:
                return get_auth_error("missing", is_graphql)

            try:
                # Decode the payload to fetch the stored details
                data = jwt.decode(
                    token, current_app.config["SECRET_KEY"], algorithms=["HS256"])

                current_user = dbh_user.get_user(data['id'])
            except:
                return get_auth_error("invalid", is_graphql)
            # returns the current logged in user to the routes
            return f(current_user, *args, **kwargs)

        return wrapped_f

    # In graphql it is called without original_f
    if original_f:
        return _decorate(original_f)
    return _decorate


def encode_jwt(user_id):
    return jwt.encode(
        {"id": user_id, "exp": datetime.utcnow() + timedelta(minutes=40)}, current_app.config["SECRET_KEY"])


def get_auth_error(missing_or_invalid, is_graphql):
    if is_graphql:
        raise Exception(f'Token is {missing_or_invalid}!')
    return jsonify({'message': f'Token is {missing_or_invalid}!'}), 401
