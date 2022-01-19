from app.models import db, User_Todo

seeded_users_todos = [
  User_Todo(user_id=7, todo_id=3),
  # User_Todo(user_id=, todo_id=),
]


def seed_users_todos():
  db.session.add_all(seeded_users_todos)
  db.session.commit()


def undo_users_todos():
  db.session.execute('TRUNCATE users_todos RESTART IDENTITY CASCADE;')
  db.session.commit()
