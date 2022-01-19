from .db import db

class List(db.Model):
  __tablename__ = 'lists'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
  creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # relationships:
  # A project has many lists, list belongs to a project
  project = db.relationship('Project', back_populates='lists')
  # lists = db.relationship('List', back_populates='project')

  # A user has many lists, list belongs to a user
  creator = db.relationship('User', back_populates='lists')
  # lists = db.relationship('List', back_populates='creator')

  # A list has many to-dos, a to-do belongs to a list
  todos = db.relationship('Todo', back_populates='list')
  # list = db.relationship('List', back_populates='todos')


  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'project_id': self.project_id,
      'creator_id': self.creator_id
    }
