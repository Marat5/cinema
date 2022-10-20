def auth_graphql_params_to_rest_body(username, password):
    return {
        "username": username,
        "password": password
    }
