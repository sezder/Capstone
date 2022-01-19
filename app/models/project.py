from .db import db

class Project(db.Model):
    __tablename__ = 'projects'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    # Relationships: 
    # User has many projects, project belongs to a user 
    # Project has many lists, list belongs to project
    # Project has many messages, message bleongs to a project
    # A project has many users assigned to it, a user has many project (M-M): through: users_projects

    def to_dict(self):
      return {
          'id': self.id,
          'name': self.name,
          'description': self.description,
          'creator_id': self.creator_id
      }
