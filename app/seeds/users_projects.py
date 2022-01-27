from app.models import db, User_Project

seeded_users_projects = [
  User_Project(user_id=4, project_id=1),
  User_Project(user_id=1, project_id=1),
  User_Project(user_id=2, project_id=1),
  User_Project(user_id=7, project_id=1),
  User_Project(user_id=11, project_id=1),

  User_Project(user_id=3, project_id=2),
  User_Project(user_id=6, project_id=2),
  User_Project(user_id=8, project_id=2),

  User_Project(user_id=8, project_id=2),
  User_Project(user_id=7, project_id=2),
# User_Project(user_id=, project_id=),
]


def seed_users_projects():
  db.session.add_all(seeded_users_projects)
  db.session.commit()


def undo_users_projects():
  db.session.execute('TRUNCATE users_projects RESTART IDENTITY CASCADE;')
  db.session.commit()
