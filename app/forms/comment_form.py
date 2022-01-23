from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired
from app.models import Comment

class CommentForm(FlaskForm):
  content = StringField('content', validators=[DataRequired()])
  message_id = IntegerField('message_id', validators=[DataRequired()])
  creator_id = IntegerField('creator_id', validators=[DataRequired()])
  created_at = DateField('created_at')
  updated_at = DateField('updated_at')
