from app.models import db, Project

seeded_projects = [
  Project(name='Logo Revamp', description='The last time our logo was updated was in 2005, so we\'ll be contracting with a local design firm to come up with a logo that captures the ethos of our company.', creator_id=2),
  Project(name='Weekly Newsletter', description='Our place to organize content for the weekly Friday newsletter to staff.', creator_id=8),
  Project(name='Social Media Coordination', description='Let\'s make sure all of the offices with social accounts are sending a consistent message.', creator_id=3),
  # Project(name='', description='', creator_id=''),
]


def seed_projects():
  db.session.add_all(seeded_projects)
  db.session.commit()


def undo_projects():
  db.session.execute('TRUNCATE projects RESTART IDENTITY CASCADE;')
  db.session.commit()
