from ariadne import convert_kwargs_to_snake_case
from cinema.models import Movie, User
from cinema.utils.jwt import token_required
from cinema.utils.strings import movie_delete_success_string
from cinema.utils.validators import map_graphql_resolver_args_to_rest_body, validate_create_movie_request_body


@token_required(is_graphql=True)
@convert_kwargs_to_snake_case
def resolve_create_movie(current_user: User, obj, info, title, director_name, year, rating):
    body_for_validation = map_graphql_resolver_args_to_rest_body(
        title=title, director_name=director_name, year=year, rating=rating)
    valid_body = validate_create_movie_request_body(body_for_validation)

    return Movie.create_movie(valid_body, current_user)


@token_required(is_graphql=True)
def resolve_delete_movie(current_user: User, obj, info, id):
    movie = Movie.delete_movie(current_user, id)
    return movie_delete_success_string(movie.title)
