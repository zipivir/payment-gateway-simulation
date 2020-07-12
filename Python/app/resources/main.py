from flask_restful import Resource
import requests

from app.settings import MOCK_SERVER_URL


class Main(Resource):

    def get(self):
        mock_server_response = requests.get("{}/healthcheck".format(MOCK_SERVER_URL))
        print("Mock server responded to health check with the following response: {}".format(mock_server_response.text))

        return {
            "status": 'OK'
        }
