from typing import List


class ValidationError(Exception):
    code = 400


def check_required_fields(body, required_fields: List[str]):
    for field in required_fields:
        if field not in body:
            raise ValidationError(f"{field.capitalize()} is required")


def validate_auth_request_body(body):
    required_fields = ["username", "password"]
    check_required_fields(body, required_fields)
