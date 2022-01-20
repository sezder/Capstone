from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Todo, db
from app.forms.new_todo_form import NewTodoForm
from app.api.auth_routes import validation_errors_to_error_messages

todo_routes = Blueprint('todos', __name__)


# ~~~~~~~~~~~ Get all todos by list id ~~~~~~~~~~~ 
@list_routes.route('/<list_id>')
@login_required
def todos_for_list(list_id):
  todos = Todo.query.filter_by(list_id=list_id)
  return jsonify([todo.to_dict() for todo in todos])


