from .db import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships: 

    # User has many projects, project belongs to a user 
    creator = db.Relationship('User', back_populates='projects')
    # projects = db.Relationship('Project', back_populates='creator')

    # Project has many lists, list belongs to project
    lists = db.Relationship('List', back_populates='project')
    # project = db.Relationship('Project', back_populates='lists')

    # Project has many messages, message bleongs to a project
    messages = db.Relationship('Message', back_populates='project')
    # project = db.Relationship('Project', back_populates='messages')

    # A project has many users assigned to it, a user has many project (M-M): through: users_projects
    users = db.Relationship('User', back_populates='project_assignments', secondary='users_todos')
    # project_assignments = db.Relationship('Project', back_populates='users', secondary='users_todos')

    def to_dict(self):
      return {
          'id': self.id,
          'name': self.name,
          'description': self.description,
          'creator_id': self.creator_id
      }
