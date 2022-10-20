from flask import Blueprint, jsonify, request
from cinema.models import Movie
from cinema.utils.custom_errors import ForbiddenError, ValidationError, ResourceDoesNotExistError, ResourceAlreadyExistsError
from cinema.utils.jwt import token_required
from cinema.utils.validators import validate_create_movie_request_body, validate_update_movie_request_body


movies_bp = Blueprint("movies", __name__, url_prefix="movies")


@movies_bp.route('/')
def movies():
    return jsonify({"movies": Movie.get_movies()})


@movies_bp.route('create', methods=["POST"])
@token_required
def create_movie(current_user):
    body: dict = request.json
    try:
        valid_body = validate_create_movie_request_body(body)
        movie = Movie.create_movie(valid_body, current_user)
    except (ValidationError, ResourceAlreadyExistsError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify(movie)


@movies_bp.route('<movie_id>', methods=["GET", "PATCH", "DELETE"])
def movie(movie_id):
    if request.method == "GET":
        return get_movie(movie_id)
    elif request.method == "DELETE":
        return delete_movie(movie_id)
    else:
        return update_movie(movie_id)


def get_movie(id):
    try:
        movie = Movie.get_movie(id)
    except ResourceDoesNotExistError as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify(movie)


@token_required
def delete_movie(current_user, id):
    try:
        movie: Movie = Movie.delete_movie(current_user, id)
    except (ResourceDoesNotExistError, ForbiddenError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify({"message": f"Success, the movie '{movie.title}' was deleted"})


@token_required
def update_movie(current_user, id):
    body: dict = request.json
    try:
        validate_update_movie_request_body(body)
        title = body.get("title")
        director_name = body.get("director")
        year = body.get("year")

        movie = Movie.get_movie(id)
        if current_user.id != movie.added_by:
            return jsonify({"error": "This movie belongs to different user"})

        movie = Movie.update_movie(id, title, director_name, year)
    except (ResourceDoesNotExistError, ValidationError, ResourceAlreadyExistsError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify(movie)
