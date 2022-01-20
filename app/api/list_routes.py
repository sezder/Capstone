from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import List, db
from app.forms.new_list_form import NewListForm
from app.api.auth_routes import validation_errors_to_error_messages

list_routes = Blueprint('lists', __name__)

# ~~~~~~~~~~~ Get all lists by project id ~~~~~~~~~~~ 
@list_routes.route('/')
def lists_for_project():
  project_id = request.json
  lists = List.query.filter_by(project_id=project_data['project_id'])
  return jsonify([list.to_dict() for list in lists])

# ~~~~~~~~~~~ Create a new list ~~~~~~~~~~~ 
# @project_routes.route('/', methods=['POST'])
# @login_required
# def new_project():
#   form = NewProjectForm()
#   form['csrf_token'].data = request.cookies['csrf_token']

#   if form.validate_on_submit():
#     project = Project(
#       name=form.data['name'],
#       description=form.data['description'],
#       creator_id=form.data['creator_id']
#     )
#     db.session.add(project)
#     db.session.commit()
#     return project.to_dict()

#   return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# ~~~~~~~~~~~ Update an existing project ~~~~~~~~~~~ 
# @project_routes.route('/<project_id>', methods=['PUT'])
# def edit_project(project_id):
#     project = Project.query.filter_by(id=project_id).one()
#     project_data = request.json
#     project.name = project_data['name']
#     project.description = project_data['description']
#     db.session.commit()
#     return jsonify(project.to_dict())

# ~~~~~~~~~~~ Delete a project ~~~~~~~~~~~ 
# @project_routes.route('/<project_id>', methods=['DELETE'])
# def delete_project(project_id):
#     project = Project.query.filter_by(id=project_id).one()
#     db.session.delete(project)
#     db.session.commit()
#     return project_id
