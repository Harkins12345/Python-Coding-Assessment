from flask import Flask, jsonify, request, abort
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
import json
import create_db

import sqlite3

app = Flask(__name__)
CORS(app)

SWAGGER_URL = '/api/docs'
API_URL = '/static/swagger.json'
swaggerui_blueprint = get_swaggerui_blueprint(
  SWAGGER_URL,
  API_URL,
  config={
    'app_name': "Python Tech Test API"
  }
)
app.register_blueprint(swaggerui_blueprint)


def dict_factory(cursor, row):
  d = {}
  for idx, col in enumerate(cursor.description):
    d[col[0]] = row[idx]
  return d


def validate_id_exists(person_id):
  conn = sqlite3.connect('test.db')
  conn.row_factory = dict_factory
  cur = conn.cursor()
  person = cur.execute('SELECT * FROM Person WHERE id LIKE :id', {'id': person_id}).fetchall()
  if not person:
    abort(404, 'Error ID not found...')


def validate_form_data(data):
  if 'firstName' not in data or 'lastName' not in data or \
    'enabled' not in data or 'authorised' not in data:
    abort(400, 'Error form data incorrect...')

  if type(data['enabled']) is str:
    if data['enabled'].title() not in ['True', 'False']:
      abort(400, 'Error boolean required for "enabled"...')

  if type(data['authorised']) is str:
    if data['authorised'].title() not in ['True', 'False']:
      abort(400, 'Error boolean required for "authorised"...')


# TODO - you will need to implement the other endpoints
# GET /api/person/{id} - get person with given id
# POST /api/people - create 1 person
# PUT /api/person/{id} - Update a person with the given id
# DELETE /api/person/{id} - Delete a person with a given id


@app.route("/api/people", methods=['GET', 'POST'])
def get_or_add_people():
  conn = sqlite3.connect('test.db')
  conn.row_factory = dict_factory
  cur = conn.cursor()

  if request.method == 'GET':
    all_people = cur.execute('SELECT * FROM Person;').fetchall()

    return jsonify(all_people)

  elif request.method == 'POST':
    if request.data:
      data = json.loads(request.data.decode('utf8').replace("'", '"'))
    else:
      data = request.form

    validate_form_data(data)

    if type(data['enabled']) is str:
      enabled = bool(data['enabled'].title())
    else:
      enabled = data['enabled']

    if type(data['authorised']) is str:
      authorised = bool(data['authorised'].title())
    else:
      authorised = data['authorised']

    last_row = cur.execute('SELECT * FROM Person ORDER BY id DESC LIMIT 1').fetchall()
    if last_row:
      person_id = int(last_row[0]['id'])
    else:
      person_id = 0
    person_id += 1

    cur.execute('INSERT INTO Person(id, firstName, lastName, authorised, enabled) VALUES(:id, :firstName, :lastName, :authorised, :enabled)',
                {'id': int(person_id),
                 'firstName': data['firstName'],
                 'lastName': data['lastName'],
                 'enabled': enabled,
                 'authorised': authorised})
    conn.commit()

    return '', 201


@app.route("/api/person/<int:person_id>", methods=['GET', 'PUT', 'DELETE'])
def interact_person_data(person_id):
  conn = sqlite3.connect('test.db')
  conn.row_factory = dict_factory
  cur = conn.cursor()

  if request.method == 'GET':
    validate_id_exists(person_id)
    person = cur.execute('SELECT * FROM Person WHERE id LIKE :id', {'id': person_id}).fetchall()

    return jsonify(person), 200

  elif request.method == 'PUT':
    if request.data:
      data = json.loads(request.data.decode('utf8').replace("'", '"'))
    else:
      data = request.form

    validate_id_exists(person_id)
    validate_form_data(data)

    if type(data['enabled']) is str:
      enabled = bool(data['enabled'].title())
    else:
      enabled = data['enabled']

    if type(data['authorised']) is str:
      authorised = bool(data['authorised'].title())
    else:
      authorised = data['authorised']

    cur.execute(
      'UPDATE Person SET firstName=:firstName, lastName=:lastName, enabled=:enabled, authorised=:authorised WHERE id=:id',
      {'id': person_id,
       'firstName': data['firstName'],
       'lastName': data['lastName'],
       'enabled': enabled,
       'authorised': authorised})
    conn.commit()

    return '', 201

  elif request.method == 'DELETE':
    validate_id_exists(person_id)
    cur.execute('DELETE FROM Person WHERE id=:id', {'id': person_id})
    conn.commit()
    print('Person with ID', person_id, 'deleted...')

    return '', 204


if __name__ == '__main__':
  app.run()
