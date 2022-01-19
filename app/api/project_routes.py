from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Project
from app.api.auth_routes import validation_errors_to_error_messages

project_routes = Blueprint('projects', __name__)


# ~~~~~~~~~~~ Create a new project ~~~~~~~~~~~ 
@project_routes.route('/', methods=['POST'])
@login_required
def new_project():
  form = NewProjectForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    project = Project(
      name=form.data['name'],
      description=form.data['description'],
      creator_id=form.data['creator_id']
    )
    db.session.add(project)
    db.session.commit()
    return project.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors), 400}
