from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
        
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    job_title(50) = db.Column(db.String, nullable=False)
    icon_url = db.Column(db.Text)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Relationships
    # User has many projects (1-M)
    # User has many lists (1-M)
    # User has many todos (1-M)
    # User has many messages (1-M)
    # User has many comments (1-M)
    # User has many assignments; an assignment, many users (M-M): through: users_projects
    # User has many projects; project, many users (M-M); through: users_todos


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'job_title': self.job_title,
            'icon_url': self.icon_url
        }
