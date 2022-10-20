class ValidationError(Exception):
    code = 400


class UnauthorizedError(Exception):
    code = 401


class ResourceDoesNotExistError(Exception):
    def __init__(self, resource_name: str) -> None:
        self.message = f"{resource_name.capitalize()} does not exist"

    def __str__(self) -> str:
        return self.message
    code = 404


class ResourceAlreadyExistsError(Exception):
    def __init__(self, resource_name: str, problematic_field_name: str, problematic_field_value: str) -> None:
        self.message = f"{resource_name.capitalize()} with {problematic_field_name} '{problematic_field_value}' already exists"

    def __str__(self) -> str:
        return self.message
    code = 409
