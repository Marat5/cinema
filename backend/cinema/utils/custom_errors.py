# "extensions" in custom errors are used in graphql error returned to client

class ValidationError(Exception):
    code = 400


class UnauthorizedError(Exception):
    extensions = {"field": "password"}
    code = 401


class ForbiddenError(Exception):
    code = 403


class ResourceDoesNotExistError(Exception):
    def __init__(self, resource_name: str, problematic_field_name: str) -> None:
        self.extensions = {"field": problematic_field_name}
        self.message = f"{resource_name.capitalize()} does not exist"

    def __str__(self) -> str:
        return self.message
    code = 404


class ResourceAlreadyExistsError(Exception):
    def __init__(self, resource_name: str, problematic_field_name: str, problematic_field_value: str) -> None:
        self.extensions = {"field": problematic_field_name}
        self.message = f"{resource_name.capitalize()} with {problematic_field_name} '{problematic_field_value}' already exists"

    def __str__(self) -> str:
        return self.message
    code = 409
