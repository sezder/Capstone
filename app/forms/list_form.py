from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import List


class ListForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  description = StringField('description')
  project_id = IntegerField('project_id', validators=[DataRequired()])
  creator_id = IntegerField('creator_id', validators=[DataRequired()])

