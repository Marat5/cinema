from ariadne import ObjectType, graphql_sync, load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from ariadne.constants import PLAYGROUND_HTML
from flask import Blueprint, jsonify, request
from cinema.alt_api.mutations.auth import resolve_register, resolve_login
from cinema.alt_api.mutations.directors import resolve_create_director
from cinema.alt_api.mutations.movies import resolve_create_movie, resolve_delete_movie, resolve_update_movie
from cinema.alt_api.queries.auth import resolve_user
from cinema.alt_api.queries.directors import resolve_director, resolve_directors, resolve_directors_count
from cinema.alt_api.queries.movies import resolve_movie, resolve_movies, resolve_movies_count


graphql_bp = Blueprint("graphql", __name__, url_prefix="graphql")

query = ObjectType("Query")
mutation = ObjectType("Mutation")

# Director
query.set_field("directors", resolve_directors)
query.set_field("directorsCount", resolve_directors_count)
query.set_field("director", resolve_director)

mutation.set_field("createDirector", resolve_create_director)

# Auth
query.set_field("user", resolve_user)

mutation.set_field("login", resolve_login)
mutation.set_field("register", resolve_register)

# Movie
query.set_field("movies", resolve_movies)
query.set_field("moviesCount", resolve_movies_count)
query.set_field("movie", resolve_movie)

mutation.set_field("createMovie", resolve_create_movie)
mutation.set_field("deleteMovie", resolve_delete_movie)
mutation.set_field("updateMovie", resolve_update_movie)


type_defs = load_schema_from_path("cinema/alt_api/schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)


@graphql_bp.route("/", methods=["POST"])
def graphql_root():
    data = request.get_json()
    success, result = graphql_sync(schema, data, context_value=request)
    status_code = 200 if success else 400
    return jsonify(result), status_code


@graphql_bp.route("/playground", methods=["GET", "POST"])
def graphql_playground():
    if request.method == "GET":
        return PLAYGROUND_HTML, 200

    data = request.get_json()

    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=True
    )

    status_code = 200 if success else 400
    return jsonify(result), status_code
