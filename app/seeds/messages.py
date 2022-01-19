from app.models import db, Message

seeded_messages = [
    Message(subject_line='Here\'s a subject', content='Here\'s some content', project_id=1, creator_id=1),
  # Message(subject_line='', content='', project_id=, creator_id=),
]


def seed_messages():
  db.session.add_all(seeded_messages)
  db.session.commit()


def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
