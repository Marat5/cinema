from flask import Blueprint, jsonify, request
from cinema.models import Director
from cinema.utils.custom_errors import ResourceAlreadyExistsError, ValidationError
from cinema.utils.jwt import token_required
from cinema.utils.validators import validate_create_director_request_body


directors_bp = Blueprint("directors", __name__, url_prefix="directors")


@directors_bp.route('/')
def directors():
    return jsonify({"directors": Director.get_directors()})


@directors_bp.route('create', methods=["POST"])
@token_required
def create_director(current_user):
    body: dict = request.json
    try:
        valid_body = validate_create_director_request_body(body)
        director = Director.create_director(valid_body)
    except (ValidationError, ResourceAlreadyExistsError) as e:
        return jsonify({"message": str(e)}), e.code

    return jsonify(director)
