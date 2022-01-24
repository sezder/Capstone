from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Comment, db
from app.forms.comment_form import CommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

# ~~~~~~~~~~~ Get all comments ~~~~~~~~~~~ 
@comment_routes.route('/')
@login_required
def all_comments():
  comments = Comment.query.all()
  return jsonify([comment.to_dict() for comment in comments])

# ~~~~~~~~~~~ Get all comments by message id ~~~~~~~~~~~ 
@comment_routes.route('/<message_id>')
@login_required
def comments_for_message(message_id):
  comments = Comment.query.filter_by(message_id=message_id)
  return jsonify([comment.to_dict() for comment in comments])


# # ~~~~~~~~~~~ Create a new comment ~~~~~~~~~~~ 
@comment_routes.route('/', methods=['POST'])
@login_required
def new_comment():
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']

  if form.validate_on_submit():
    comment = Comment (
      content = form.data['content'],
      message_id=form.data['message_id'],
      creator_id=form.data['creator_id']
    )

    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()

  return {'errors': validation_errors_to_error_comments(form.errors)}, 400

# ~~~~~~~~~~~ Update an existing comment ~~~~~~~~~~~ 
@comment_routes.route('/<comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):
  comment = Comment.query.filter_by(id=comment_id).one()
  comment_data = request.json
  comment.content = comment_data['content']

  db.session.commit()
  return jsonify(comment.to_dict())


# ~~~~~~~~~~~ Delete a comment ~~~~~~~~~~~ 
@comment_routes.route('/<comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter_by(id=comment_id).one()
    db.session.delete(comment)
    db.session.commit()
    return comment_id
