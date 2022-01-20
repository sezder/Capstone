from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Project

class ProjectForm(FlaskForm):
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description')
  creator_id = IntegerField('creator_id', validators=[DataRequired()])
