from .db import db

class Comment(db.Model):
  __tablename__ = 'comments'
  
  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.Text, nullable=False)
  message_id = db.Column(db.Integer, db.ForeignKey('messages.id'), nullable=False)
  creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_at = db.Column(db.DateTime,  default=db.func.current_timestamp())
  updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
