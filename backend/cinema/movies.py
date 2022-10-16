from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError
from cinema.auth import token_required
from cinema.database import ResourceDoesNotExistError, db_helper as dbh
from cinema.validators import ValidationError, validate_add_movie_request_body, validate_update_movie_request_body


bp = Blueprint("movies", __name__, url_prefix="movies")


@bp.route('/')
def movies():
    return jsonify({"movies": dbh.get_movies()})


@bp.route('add', methods=["POST"])
@token_required
def add_movie(current_user):
    body: dict = request.json
    try:
        validate_add_movie_request_body(body)
        title = body.get("title")
        director_name = body.get("director")
        year = body.get("year")

        movie = dbh.add_movie(title=title, added_by=current_user.id,
                              director_id=dbh.get_director_id(director_name), year=year)
    except ValidationError as e:
        return jsonify({"message": str(e)}), e.code
    except IntegrityError as e:
        return jsonify({"message": f"Movie '{title}' already exists"}), 409

    return jsonify(movie)


@bp.route('<movie_id>', methods=["PUT", "DELETE"])
@token_required
def update_movie(current_user, movie_id):
    body: dict = request.json
    try:
        if request.method == "DELETE":
            movie = dbh.delete_movie(movie_id)
            return jsonify({"message": f'Success, the movie "{movie["title"]}" was deleted'})

        validate_update_movie_request_body(body)
        title = body.get("title")
        director_name = body.get("director")
        year = body.get("year")

        movie = dbh.get_movie(movie_id)
        if current_user.id != movie.added_by:
            return jsonify({"error": "This movie belongs to different user"})

        movie = dbh.update_movie(movie_id, title, director_name, year)
    except (ResourceDoesNotExistError, ValidationError) as e:
        return jsonify({"message": str(e)}), e.code
    except IntegrityError as e:
        return jsonify({"message": f"Movie '{title}' already exists"}), 409

    return jsonify(movie)


@bp.route('directors')
def directors():
    return jsonify({"directors": dbh.get_directors()})
