import os
from flask import Flask
from flask_cors import CORS
from cinema.middleware.slow_down_middleware import SlowDownMiddleware


def register_blueprints(app: Flask):
    # Common api blueprint
    from cinema.views.common_api_blueprint import api_bp

    # Rest api blueprints
    from cinema.views.auth import auth_bp
    from cinema.views.movies import movies_bp
    from cinema.views.directors import directors_bp
    api_bp.register_blueprint(auth_bp)
    api_bp.register_blueprint(movies_bp)
    api_bp.register_blueprint(directors_bp)

    # Graphql blueprint
    from cinema.alt_api.graphql import graphql_bp
    api_bp.register_blueprint(graphql_bp)

    # Combined graphql and rest api
    app.register_blueprint(api_bp)

    # React applcation static files blueprint
    from cinema.views.react_app import react_app_bp
    app.register_blueprint(react_app_bp)


def create_app():
    app = Flask(__name__, instance_relative_config=True,
                static_folder=None)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )
    CORS(app)
    app.wsgi_app = SlowDownMiddleware(app.wsgi_app)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///cinema.db"
    from cinema.models import db
    db.init_app(app)
    with app.app_context():
        db.create_all()

    register_blueprints(app)

    return app
