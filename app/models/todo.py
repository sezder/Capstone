from .db import db

class Todo(db.Model):
  __tablename__ = 'todos'

  id = db.Column(db.Integer, primary_key=True)
  task = db.Column(db.String, nullable=False)
  list_id = db.Column(db.Integer, db.ForeignKey('lists.id'), nullable=False)
  creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  completed = db.Column(db.Boolean, nullable=False, default=False)
  due = db.Column(db.DateTime, nullable=False)

  # relationships: 

  # A list has many to-dos, a todo belongs to a list
  list = db.relationship('List', back_populates='todos')
  todos = db.relationship('Todo', back_populates='list')

  # A creates many to-dos, a todo is created by one user
  creator = db.relationship('User', back_populates='todos')
  # todos = db.relationship('Todo', back_populates='creator')

  # A user has many todos, a todo many users; through: users_todos
  users = db.relationship('User', back_populates='todo_assignments', secondary='users_todos')
  # todo_assignments = db.relationship('Todo', back_populates='users', secondary='users_todos')

  def to_dict(self):
    return {
      'id': self.id,
      'task': self.task,
      'list_id': self.list_id,
      'creator_id': self.creator_id,
      'completed': self.completed,
      'due': self.due
    }
