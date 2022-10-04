import os
from flask import Flask, Blueprint

api_bp = Blueprint("api", __name__, url_prefix="/api")


def register_blueprints(app: Flask):
    from . import auth
    from . import movies
    api_bp.register_blueprint(auth.bp)
    api_bp.register_blueprint(movies.bp)

    app.register_blueprint(api_bp)


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'cinema.sqlite')
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    register_blueprints(app)

    return app
