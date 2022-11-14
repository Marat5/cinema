import os
from flask import Blueprint, send_from_directory


react_app_bp = Blueprint("react_app", __name__, static_folder="../react_build")


@react_app_bp.route('/', defaults={'path': ''})
@react_app_bp.route('/<path:path>')
def serve_react_app(path):
    if path != "" and os.path.exists(react_app_bp.static_folder + '/' + path):
        return send_from_directory(react_app_bp.static_folder, path)
    else:
        return send_from_directory(react_app_bp.static_folder, 'index.html')
