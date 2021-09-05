from flask import Flask, send_from_directory
from server.service import Service
pd_app = Flask(__name__, static_url_path='', static_folder='frontend/build')

@pd_app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(pd_app.static_folder,'index.html')

service = Service()
