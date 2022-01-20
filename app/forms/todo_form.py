from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, BooleanField
from wtforms.validators import DataRequired
from app.models import Todo

class TodoForm(FlaskForm):
  pass
