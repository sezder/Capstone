from app.models import db, Todo

seeded_todos = [
  Todo(task='Brainstorm questions for poll', list_id=1, creator_id=11, due='2021-02-01 00:00:00'),
  Todo(task='Finalize poll questions', list_id=1, creator_id=11, due='2021-02-14 00:00:00'),
  Todo(task='Create poll', list_id=1, creator_id=11, due='2021-02-15 00:00:00'),
  # Todo(task='', list_id=, creator_id=, due=''),
]


def seed_todos():
  db.session.add_all(seeded_todos)
  db.session.commit()


def undo_todos():
  db.session.execute('TRUNCATE todos RESTART IDENTITY CASCADE;')
  db.session.commit()
