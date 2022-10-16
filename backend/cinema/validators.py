from typing import List


class ValidationError(Exception):
    code = 400


def check_required_fields(body, required_fields: List[str]):
    for field in required_fields:
        if field not in body:
            raise ValidationError(f"{field.capitalize()} is required")


def check_one_of_many_is_present(body, fields: List[str]):
    for field in fields:
        if field in body:
            return True

    raise ValidationError(
        f"At least one of these fields should be filled: {fields}")


def validate_auth_request_body(body):
    required_fields = ["username", "password"]
    check_required_fields(body, required_fields)


def validate_add_movie_request_body(body):
    required_fields = ["title", "director", "year"]
    check_required_fields(body, required_fields)


def validate_update_movie_request_body(body):
    one_of_many_fields = ["title", "director", "year"]
    check_one_of_many_is_present(body, one_of_many_fields)
