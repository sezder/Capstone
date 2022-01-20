from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import List, db
from app.forms.new_list_form import NewListForm
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

# ~~~~~~~~~~~ Get all lists by project id ~~~~~~~~~~~ 
@list_routes.route('/<project_id>')
def lists_for_project(project_id):
  lists = List.query.filter_by(project_id=project_id)
  return jsonify([list.to_dict() for list in lists])

# ~~~~~~~~~~~ Create a new list ~~~~~~~~~~~ 
@list_routes.route('/', methods=['POST'])
@login_required
def new_list():
  form = NewListForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    list = List(
      title=form.data['title'],
      description=form.data['description'],
      project_id=form.data['project_id'],
      creator_id=form.data['creator_id']
    )
    db.session.add(list)
    db.session.commit()
    return list.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# ~~~~~~~~~~~ Update an existing list ~~~~~~~~~~~ 
@list_routes.route('/<list_id>', methods=['PUT'])
def edit_list(list_id):
  list = List.query.filter_by(id=list_id).one()
  list_data = request.json
  list.title = list_data['title']
  list.description = list_data['description']
  db.session.commit()
  return jsonify(list.to_dict())

# ~~~~~~~~~~~ Delete a project ~~~~~~~~~~~ 
# @project_routes.route('/<project_id>', methods=['DELETE'])
# def delete_project(project_id):
#     project = Project.query.filter_by(id=project_id).one()
#     db.session.delete(project)
#     db.session.commit()
#     return project_id
