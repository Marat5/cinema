from ariadne import convert_kwargs_to_snake_case
from cinema.models.movie import Movie
from cinema.models.user import User
from cinema.utils.jwt import token_required
from cinema.utils.strings import movie_delete_success_string
from cinema.utils.validators import map_graphql_resolver_args_to_rest_body, validate_create_movie_request_body, validate_update_movie_request_body


@token_required(is_graphql=True)
@convert_kwargs_to_snake_case
def resolve_create_movie(current_user: User, obj, info, title, director_name, year, rating):
    body_for_validation = map_graphql_resolver_args_to_rest_body(
        title=title, director_name=director_name, year=year, rating=rating)
    valid_body = validate_create_movie_request_body(body_for_validation)

    movie = Movie.create_movie(current_user, valid_body)
    return movie


@token_required(is_graphql=True)
def resolve_delete_movie(current_user: User, obj, info, id):
    movie = Movie.delete_movie(current_user, id)
    return movie_delete_success_string(movie.title)


@token_required(is_graphql=True)
@convert_kwargs_to_snake_case
def resolve_update_movie(current_user: User, obj, info, id, title=None, director_name=None, year=None, rating=None):
    body_for_validation = map_graphql_resolver_args_to_rest_body(
        title=title, director_name=director_name, year=year, rating=rating)
    valid_body = validate_update_movie_request_body(body_for_validation)

    movie = Movie.update_movie(current_user, id, valid_body)
    return movie
