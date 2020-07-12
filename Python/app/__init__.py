from flask import Flask
from flask_restful import Api


def create_app():
    app = Flask(__name__)
    api = Api(app)

    from .resources import main_api
    api.add_resource(main_api, '/healthcheck')

    return app


if __name__ == '__main__':
    application = create_app()
