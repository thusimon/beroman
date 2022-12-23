from flask import Flask, send_from_directory, jsonify
from server.service import Service
#from flask_graphql import GraphQLView
#from server.graphql.schema import schema

pd_app = Flask(__name__, static_url_path='', static_folder='frontend/build')
#pd_app.debug = True

service = Service()

#pd_app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

@pd_app.route("/", defaults={'path':''})
def serveIndex(path):
  return send_from_directory(pd_app.static_folder,'index.html')

@pd_app.route("/service-worker.js", defaults={'path':''})
def serveSW(path):
  resp = send_from_directory(pd_app.static_folder,'service-worker.js')
  resp.headers['content-type'] = 'application/javascript'
  return resp

@pd_app.route('/api/all_pd', methods=['GET'])
def api_all_pd():
  all_pd = service.get_all_pd()
  return jsonify(all_pd)

print('server started')
