class ValidationError(Exception):
    code = 400


class ResourceDoesNotExistError(Exception):
    def __init__(self, resource_name: str) -> None:
        self.message = f"{resource_name.capitalize()} does not exist"

    def __str__(self) -> str:
        return self.message
    code = 404
