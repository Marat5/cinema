from ariadne import ObjectType, graphql_sync, load_schema_from_path, make_executable_schema, snake_case_fallback_resolvers
from ariadne.constants import PLAYGROUND_HTML
from flask import Blueprint, jsonify, request
from cinema.alt_api.mutations import resolve_add_director

from cinema.alt_api.queries import resolve_director, resolve_directors


graphql_bp = Blueprint("graphql", __name__, url_prefix="graphql")

query = ObjectType("Query")
query.set_field("directors", resolve_directors)
query.set_field("director", resolve_director)

mutation = ObjectType("Mutation")
mutation.set_field("addDirector", resolve_add_director)

type_defs = load_schema_from_path("cinema/alt_api/schema.graphql")
schema = make_executable_schema(
    type_defs, query, mutation, snake_case_fallback_resolvers
)


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

# Example queries
# query fetchDirector {
#   director(directorId: "1") {
#     name
#     id
#   }
# }


# query fetchAllDirectors {
#   directors {
#     name
#     id
#   }
# }

# mutation newDirector {
#   addDirector(name: "Wes Anderson other") {
#     name
#     id
#   }
# }
