from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
from cinema.utils.custom_errors import ValidationError, ResourceDoesNotExistError
from cinema.utils.jwt import token_required
from cinema.utils.validators import validate_add_movie_request_body, validate_update_movie_request_body
from cinema.utils.db_helper import dbh_movie, dbh_director


movies_bp = Blueprint("movies", __name__, url_prefix="movies")


@movies_bp.route('/')
def movies():
    return jsonify({"movies": dbh_movie.get_movies()})


@movies_bp.route('add', methods=["POST"])
@token_required
def add_movie(current_user):
    body: dict = request.json
    try:
        validate_add_movie_request_body(body)
        title = body.get("title")
        director_name = body.get("director")
        year = body.get("year")

        movie = dbh_movie.add_movie(title=title, added_by=current_user.id,
                                    director_id=dbh_director.get_director_id(director_name), year=year)
    except ValidationError as e:
        return jsonify({"message": str(e)}), e.code
    except IntegrityError as e:
        return jsonify({"message": f"Movie '{title}' already exists"}), 409

    return jsonify(movie)


@movies_bp.route('<movie_id>', methods=["GET", "PUT", "DELETE"])
def movie(movie_id):
    if request.method == "GET":
        return get_movie(movie_id)
    elif request.method == "DELETE":
        return delete_movie(movie_id)
    else:
        return update_movie(movie_id)


@movies_bp.route('directors')
def directors():
    return jsonify({"directors": dbh_director.get_directors()})


def get_movie(id):
    try:
        movie = dbh_movie.get_movie(id)
    except ResourceDoesNotExistError as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify(movie)


@token_required
def delete_movie(id):
    try:
        movie = dbh_movie.delete_movie(id)
    except ResourceDoesNotExistError as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify({"message": f'Success, the movie "{movie["title"]}" was deleted'})


@token_required
def update_movie(current_user, id):
    body: dict = request.json
    try:
        validate_update_movie_request_body(body)
        title = body.get("title")
        director_name = body.get("director")
        year = body.get("year")

        movie = dbh_movie.get_movie(id)
        if current_user.id != movie.added_by:
            return jsonify({"error": "This movie belongs to different user"})

        movie = dbh_movie.update_movie(id, title, director_name, year)
    except (ResourceDoesNotExistError, ValidationError) as e:
        return jsonify({"message": str(e)}), e.code
    except IntegrityError as e:
        return jsonify({"message": f"Movie '{title}' already exists"}), 409

    return jsonify(movie)
