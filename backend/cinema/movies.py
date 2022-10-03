from flask import Blueprint, jsonify


bp = Blueprint("movies", __name__, url_prefix="movies")


@bp.route('/')
def movies():
    return jsonify({"movies": [1, 2, 3]})


@bp.route('add')
def add_movie():
    return jsonify({"add": [1, 2, 3]})
