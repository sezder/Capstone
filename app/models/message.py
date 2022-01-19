from .db import db

class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key=True)
  subject_line = db.Column(db.String(50), nullable=False)
  content = db.Column(db.Text, nullable=False)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False)
  creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime,  default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  # Relationships: 
  
  # A project has many messages, a message belongs to a project
  project = db.Relationship('Project', back_populates='messages')
  # messages = db.Relationship('Message', back_populates='project')

  # A user has many messages, a message belongs to a user
  creator = db.Relationship('User', back_populates='messages')
  # messages = db.Relationship('Message', back_populates='creator')

  # A comment belongs to a message, a message has many comments
  comments = db.Relationship('Comment', back_populates='message')
  # message = db.Relationship('Message', back_populates='comments')

  def to_dict(self):
    return {
      'id': self.id,
      'subject_line': self.subject_line,
      'content': self.content,
      'project_id': self.project_id,
      'creator_id': self.creator_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
