from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired
from app.models import Message

class MessageForm(FlaskForm):
  subject_line = StringField('subject_line', validators=[DataRequired()])
  content = StringField('content', validators=[DataRequired()])
  project_id = IntegerField('project_id', validators=[DataRequired()])
  creator_id = IntegerField('creator_id', validators=[DataRequired()])
  created_at = DateField('created_at')
  updated_at = DateField('updated_at')
