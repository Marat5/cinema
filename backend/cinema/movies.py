from flask import Blueprint, jsonify, request

from cinema.auth import token_required
from cinema.database import Director, db, Movie


bp = Blueprint("movies", __name__, url_prefix="movies")


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
        errors.append("Title and director are required")

    if errors:
        return jsonify({"errors": errors})

    director = db.session.execute(
        db.select(Director).filter_by(name=director_name)).scalars().first()
    print('b', director)
    if not director:
        director = Director(name=director_name)
        db.session.add(director)
        db.session.commit()

    try:
        db.session.add(Movie(title=title, added_by=current_user.id,
                             director=director.id, year=year))
        db.session.commit()
    except:
        return jsonify({"error": "This movie was already added"})

    return jsonify({"message": "Success"})


@bp.route('directors')
def directors():
    directors = db.session.execute(db.select(Director)).scalars().all()
    return jsonify({"directors": directors})
