import time


class SlowDownMiddleware:
    # Slows down every api response
    # To enjoy the loaders on client
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        time.sleep(0.5)
        return self.app(environ, start_response)
