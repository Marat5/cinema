from flask import Blueprint, jsonify, request

from cinema.auth import token_required
from cinema.database import db_helper as dbh


bp = Blueprint("movies", __name__, url_prefix="movies")


@bp.route('/')
def movies():
    return jsonify({"movies": dbh.get_movies()})


@bp.route('add', methods=["POST"])
@token_required
def add_movie(current_user):
    errors = []
    try:
        title = request.json['title']
        director_name = request.json['director']
        year = request.json['year']
    except:
        errors.append("Title, year and director are required")

    if errors:
        return jsonify({"errors": errors})

    try:
        dbh.add_movie(title=title, added_by=current_user.id,
                      director_id=dbh.get_director_id(director_name), year=year)
    except:
        return jsonify({"error": "This movie was already added"})

    return jsonify({"message": "Success"})


@bp.route('<movie_id>', methods=["PUT", "DELETE"])
@token_required
def update_movie(current_user, movie_id):
    movie = dbh.get_movie(movie_id)
    if not movie:
        return jsonify({"error": "Movie with this id does not exist"})

    if request.method == "DELETE":
        dbh.delete_movie(movie_id)
        return jsonify({"message": "Success, the movie was deleted"})

    try:
        title = request.json['title']
        director_name = request.json['director']
        year = request.json['year']
    except:
        return jsonify({"error": "Title, year and director are required"})

    if current_user.id != movie.added_by:
        return jsonify({"error": "This movie belongs to different user"})

    movie = dbh.update_movie(movie_id, title, director_name, year)

    return jsonify(movie)


@bp.route('directors')
def directors():
    return jsonify({"directors": dbh.get_directors()})
