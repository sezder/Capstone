from .db import db

class Todo(db.Model):
  __tablename__ = 'todos'

  id = db.Column(db.Integer, primary_key=True)
  task = db.Column(db.String, nullable=False)
  list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)
  creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  completed = db.Columnn(db.Boolean, nullable=False, default=False)
  due = db.Column(db.DateTime, nullable=False)

  # Relationships: 
  # A list has many to-dos, a todo belongs to a list
  # A creates many to-dos, a todo is created by one user
  # A user has many todos, a todo many users; through: users_todos

  def to_dict(self):
    return {
      'id': self.id,
      'task': self.task,
      'list_id': self.list_id,
      'creator_id': self.creator_id,
      'completed': self.completed,
      'due': self.due
    }
