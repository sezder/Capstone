from .db import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # relationships: 

    # User has many projects, project belongs to a user 
    creator = db.relationship('User', back_populates='projects')
    # projects = db.relationship('Project', back_populates='creator')

    # Project has many lists, list belongs to project
    lists = db.relationship('List', back_populates='project', cascade="all, delete")
    # project = db.relationship('Project', back_populates='lists')

    # Project has many messages, message bleongs to a project
    messages = db.relationship('Message', back_populates='project', cascade="all, delete")
    # project = db.relationship('Project', back_populates='messages')

    # A project has many users assigned to it, a user has many project (M-M): through: users_projects
    users = db.relationship('User', back_populates='project_assignments', secondary='users_projects')
    # project_assignments = db.relationship('Project', back_populates='users', secondary='users_projects')

    def to_dict(self):
      return {
          'id': self.id,
          'name': self.name,
          'description': self.description,
          'creator_id': self.creator_id
      }
