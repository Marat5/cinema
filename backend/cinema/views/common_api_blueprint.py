from flask import Blueprint, abort

# This blueprint exists to combine rest and graphql blueprints
# And handle 404 for api methods correctly
# As react_app blueprint returns react app from all non /api endpoints for client side routing
api_bp = Blueprint("api", __name__, url_prefix="/api")


@api_bp.route("<path:path>")
def not_found_method(path):
    # Return 404 for all /api methods that don't exist
    abort(404)
