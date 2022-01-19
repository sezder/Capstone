from .db import db

class Comment(db.Model):
  __tablename__ = 'comments'
  
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.Text, nullable=False)
  message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)
  creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime,  default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  # relationship:
  # A user has many comments, a comment belongs to a user 
  creator = db.relationship('User', back_populates='comments')
  # comments = db.relationship('Comment', back_populates='creator')

  # A message has many comments, a comment belongs to a message
  message = db.relationship('Message', back_populates='comments')
  # comments = db.relationship('Comment', back_populates='message')

  def to_dict(self):
    return {
      'id': self.id,
      'content': self.content,
      'message_id': self.message_id,
      'creator_id': self.creator_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }
