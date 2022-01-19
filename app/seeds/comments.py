from app.models import db, Comment

seeded_comments = [
  Comment(content='Comment 1', message_id=1, creator_id=1),
  # Comment(content='', message_id=, project_id=, creator_id=),

]


def seed_comments():
  db.session.add_all(seeded_comments)
  db.session.commit()


def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
