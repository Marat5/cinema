from flask import Blueprint, jsonify, request

from cinema.auth import token_required
from cinema.db import get_db


bp = Blueprint("movies", __name__, url_prefix="movies")


@bp.route('/')
def movies():
    db = get_db()
    movies = [{"id": item["id"], "title": item["title"], "year": item["year"], "director_id": item["director"], "director": item["name"]}
              for item in db.execute("SELECT * FROM movie m JOIN director d ON m.director = d.id;").fetchall()]
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

    db = get_db()
    director = db.execute(
        "SELECT * FROM director WHERE LOWER(name) LIKE LOWER(?);", (director_name,)).fetchone()

    if not director:
        db.execute(
            "INSERT INTO director (name) VALUES (?)", (director_name,))
        db.commit()
        director = db.execute(
            "SELECT * FROM director WHERE LOWER(name) LIKE LOWER(?);", (director_name,)).fetchone()

    db.execute(
        "INSERT INTO movie (title, added_by, director, year) VALUES (?, ?, ?, ?)", (title, current_user["id"], director["id"], year))
    db.commit()

    return jsonify({"message": "Success"})


@bp.route('directors')
def directors():
    db = get_db()
    directors = [{"id": item["id"], "name": item["name"]}
                 for item in db.execute("SELECT * FROM director;").fetchall()]
    return jsonify({"directors": directors})
