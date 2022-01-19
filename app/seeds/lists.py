from app.models import db, List

seeded_lists = [
  List(title='Community Polling', description='We\'re gearing up to send out polls on what makes our company unique.', project_id=1, creator_id=11),
  List(title='Social Media Rollout', description='Let\'s plan some ways to share the logo on social once it is finished.', project_id=1, creator_id=3),
  List(title='Logo Mockups', description='Our central place to track mockups and feedback.', project_id=1, creator_id=4),
  List(title='Friday, Jan. 21', project_id=2, creator_id=8),
  List(title='Friday, Jan. 28', project_id=2, creator_id=8),
  List(title='Friday, Feb. 4', project_id=2, creator_id=8)
]


def seed_lists():
  db.session.add_all(seeded_lists)
  db.session.commit()


def undo_lists():
  db.session.execute('TRUNCATE lists RESTART IDENTITY CASCADE;')
  db.session.commit()
