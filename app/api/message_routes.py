from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Message, db
from app.forms.message_form import MessageForm
from app.api.auth_routes import validation_errors_to_error_messages

message_routes = Blueprint('messages', __name__)

# ~~~~~~~~~~~ Get all messages by project id ~~~~~~~~~~~ 
@message_routes.route('/<message_id>')
@login_required
def messages_for_project(message_id):
  messages = Message.query.filter_by(project_id=project_id)
  return jsonify([message.to_dict() for message in messages])


# ~~~~~~~~~~~ Create a new list ~~~~~~~~~~~ 
@list_routes.route('/', methods=['POST'])
@login_required
def new_list():
  form = ListForm()
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
