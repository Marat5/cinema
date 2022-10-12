from flask import Blueprint, jsonify, request

from cinema.auth import token_required
from cinema.database import Director, db, Movie


bp = Blueprint("movies", __name__, url_prefix="movies")


def get_director_id(director_name):
    director = db.session.execute(
        db.select(Director).filter_by(name=director_name)).scalars().first()

    if not director:
        director = Director(name=director_name)
        db.session.add(director)
        db.session.commit()

    return director.id


@bp.route('/')
def movies():
    movies = db.session.execute(db.select(Movie)).scalars().all()

    return jsonify({"movies": movies})


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
        db.session.add(Movie(title=title, added_by=current_user.id,
                             director=get_director_id(director_name), year=year))
        db.session.commit()
    except:
        return jsonify({"error": "This movie was already added"})

    return jsonify({"message": "Success"})


@bp.route('<movie_id>', methods=["PUT", "DELETE"])
@token_required
def update_movie(current_user, movie_id):
    movie = db.session.execute(
        db.select(Movie).filter_by(id=movie_id)).scalars().first()
    if not movie:
        return jsonify({"error": "Movie with this id does not exist"})

    if request.method == "DELETE":
        db.session.delete(movie)
        db.session.commit()
        return jsonify({"message": "Success, the movie was deleted"})

    try:
        title = request.json['title']
        director_name = request.json['director']
        year = request.json['year']
    except:
        return jsonify({"error": "Title, year and director are required"})

    if current_user.id != movie.added_by:
        return jsonify({"error": "This movie belongs to different user"})

    movie.title = title
    movie.director = get_director_id(director_name)
    movie.year = year

    db.session.commit()

    return jsonify(movie)


@bp.route('directors')
def directors():
    directors = db.session.execute(db.select(Director)).scalars().all()
    return jsonify({"directors": directors})
