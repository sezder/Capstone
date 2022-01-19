from .db import db

class User_Project(db.Model):
  __tablename__ = 'users_todos'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  todo_id = db.Column(db.Integer, db.ForeignKey('todos.id'), nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'todo_id': self.todo_id
    }
