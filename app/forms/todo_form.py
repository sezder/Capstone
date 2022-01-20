from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, BooleanField
from wtforms.validators import DataRequired
from app.models import Todo

class TodoForm(FlaskForm):
  task = StringField('task', validators=[DataRequired()])
  list_id = IntegerField('list_id', validators=[DataRequired()])
  creator_id = IntegerField('creator_id', validators=[DataRequired()])
  completed = BooleanField('created', validators=[DataRequired()])
  due = DateField('due', validators=[DataRequired()])
