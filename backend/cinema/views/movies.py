from flask import Blueprint, jsonify, request
from cinema.models.movie import Movie
from cinema.utils.custom_errors import ForbiddenError, ValidationError, ResourceDoesNotExistError, ResourceAlreadyExistsError
from cinema.utils.jwt import token_required
from cinema.utils.strings import movie_delete_success_string
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
        movie = Movie.create_movie(current_user, valid_body)
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

    return jsonify({"message": movie_delete_success_string(movie.title)})


@token_required
def update_movie(current_user, id):
    body: dict = request.json
    try:
        valid_body = validate_update_movie_request_body(body)
        movie = Movie.update_movie(current_user, id, valid_body)
    except (ResourceDoesNotExistError, ValidationError, ResourceAlreadyExistsError, ForbiddenError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify(movie)
