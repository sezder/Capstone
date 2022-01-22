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


# # ~~~~~~~~~~~ Create a new list ~~~~~~~~~~~ 
@message_routes.route('/', methods=['POST'])
@login_required
def new_message():
  form = MessageForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    message = List (
      subject_line = form.data['subject_line'],
      content = form.data['content'],
      project_id=form.data['project_id'],
      creator_id=form.data['creator_id']
    )
    
    db.session.add(message)
    db.session.commit()
    return message.to_dict()

  return {'errors': validation_errors_to_error_messages(form.errors)}, 400
