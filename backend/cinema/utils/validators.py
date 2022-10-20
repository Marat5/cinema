# Common functions for validation
# When used in graphql resolvers params should be mapped to match rest body
from typing import List

from cinema.utils.custom_errors import ValidationError


def validate_auth_request_body(body):
    required_fields = ["username", "password"]
    check_required_fields(body, required_fields)


def validate_create_movie_request_body(body):
    required_fields = ["title", "director_name", "year", "rating"]
    check_required_fields(body, required_fields)
    return body


def validate_update_movie_request_body(body):
    one_of_many_fields = ["title", "director_name", "year"]
    check_one_of_many_is_present(body, one_of_many_fields)


def validate_create_director_request_body(body):
    required_fields = ["name"]
    check_required_fields(body, required_fields)


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


def map_graphql_resolver_args_to_rest_body(**kwargs):
    # Pass params of graphql resolver as kwargs to create dict that looks exactly like rest body
    return kwargs
