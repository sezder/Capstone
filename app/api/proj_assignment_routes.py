from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User_Project, db

proj_assignment_routes = Blueprint('projAssignments', __name__)

# ~~~~~~~~~~~ Get all project assignments by project id ~~~~~~~~~~~ 
@proj_assignment_routes.route('/<project_id>')
@login_required
def assignments_for_project(project_id):
  assignments = User_Project.query.filter_by(project_id=project_id)
  return jsonify([assignment.to_dict() for assignment in assignments])


# ~~~~~~~~~~~ Create a project assignment ~~~~~~~~~~~ 
@proj_assignment_routes.route('/', methods=['POST'])
@login_required
def create_proj_assignment():
  assignment_data = request.json
  new_proj_assignment = User_Project(
    user_id=assignment_data['user_id'], 
    project_id=assignment_data['project_id'])
  db.session.add(new_proj_assignment)
  db.session.commit()
  return new_proj_assignment.to_dict()


# ~~~~~~~~~~~ Delete a project assignment ~~~~~~~~~~~ 
@proj_assignment_routes.route('/', methods=['DELETE'])
@login_required
def delete_proj_assignment():
    id = request.json
    print(id, 'id DOGG')
    assignment = User_Project.query.filter_by(id=id).one()
    db.session.delete(assignment)
    db.session.commit()
    return jsonify(id)
