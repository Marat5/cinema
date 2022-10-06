import os
from flask import Flask, Blueprint

api_bp = Blueprint("api", __name__, url_prefix="/api")


def register_blueprints(app: Flask):
    from . import auth
    from . import movies
    api_bp.register_blueprint(auth.bp)
    api_bp.register_blueprint(movies.bp)

    app.register_blueprint(api_bp)


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cinema.db"
    from .database import db
    db.init_app(app)
    with app.app_context():
        db.create_all()

    register_blueprints(app)

    return app
