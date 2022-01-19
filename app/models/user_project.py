from .db import db

class User_Project(db.Model):
  __tablename__ = 'users_projects'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)

  def to_dict(self):
    return {
      'id': self.id,
      'user_id': self.user_id,
      'project_id': self.project_id
    }
