from .db import db

class List(db.Model):
  __tablename__ = 'lists'

  id = db.Column(db.Integer, primary_key=True)
  title = db.Column(db.String(50), nullable=False)
  description = db.Column(db.Text)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
  creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

  # Relationships:
  # A project has many lists, list belongs to a project
  project = db.Relationship('Project', back_populates='lists')
  # lists = db.Relationship('List', back_populates='project')

  # A user has many lists, list belongs to a user
  creator = db.Relationship('User', back_populates='lists')
  # lists = db.Relationship('List', back_populates='creator')

  # A list has many to-dos, a to-do belongs to a list
  todos = db.Relationship('Todo', back_populates='list')
  # list = db.Relationship('List', back_populates='todos')


  def to_dict(self):
    return {
      'id': self.id,
      'title': self.title,
      'description': self.description,
      'project_id': self.project_id,
      'creator_id': self.creator_id
    }
