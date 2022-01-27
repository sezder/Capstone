from app.models import db, User

seeded_users = [
  # User(first_name='Demo', last_name='User', email='demo@co.com', job_title='Graphic Designer', hashed_password='password'),
    User(first_name='Demo', last_name='User', email='demo@co.com', job_title='Graphic Designer', hashed_password='pbkdf2:sha256:260000$BFOvJReiEBrOeLFH$bc99e9be5ad69365ced3908117b858e139bec042f7dda4c259b3411f2b07fac0'),
    User(first_name='Fariha', last_name='Newman', email='fnewman@co.com', job_title='Vice President for Communications', hashed_password='password', icon_url='https://source.unsplash.com/SJvDxw0azqw '),
    User(first_name='Donell', last_name='Mccormack', email='dmccormack@co.com', job_title='Content & Social Media Manager', hashed_password='password', icon_url='https://source.unsplash.com/XdYSoOHalUY'),
    User(first_name='Amelia-Mae', last_name='Burke', email='aburke@co.com', job_title='Graphic Designer', hashed_password='password', icon_url='https://source.unsplash.com/A73ah5JKtVA'),
    User(first_name='Persephone', last_name='Hackett', email='phackett@co.com', job_title='Video Producer', hashed_password='password', icon_url='https://source.unsplash.com/9lf_erPHYG0'),
    User(first_name='Luther', last_name='Mccoy', email='lmccoy@co.com', job_title='Editorial Director', hashed_password='password', icon_url='https://source.unsplash.com/OhKElOkQ3RE'),
    User(first_name='Jay', last_name='Crawford', email='jcrawford@co.com', job_title='Director of Web & Digital Media', hashed_password='password', icon_url='https://source.unsplash.com/HfMCgqOLTyM'),
    User(first_name='Horace', last_name='Hurst', email='hhurst@co.com', job_title='Communications Coordinator', hashed_password='password', icon_url='https://source.unsplash.com/pAtA8xe_iVM'),
    User(first_name='Riya', last_name='Ewing', email='rewing@co.com', job_title='Assistant Vice President for Communications', hashed_password='password', icon_url='https://source.unsplash.com/WYE2UhXsU1Y'),
    User(first_name='Isabell', last_name='Whitworth', email='iwhitworth@co.com', job_title='Photographer & Photo Editor', hashed_password='password', icon_url='https://source.unsplash.com/eJ0UGX8da2c'),
    User(first_name='Joe', last_name='Boyer', email='jboyer@co.com', job_title='Project Manager', hashed_password='password', icon_url='https://source.unsplash.com/Xaen-acsLLo'),
    User(first_name='Darcie', last_name='Henderson', email='dhenderson@co.com', job_title='Assistant Vice President for Communications', hashed_password='password', icon_url='https://source.unsplash.com/_H6wpor9mjs'),
    # User(first_name='', last_name='', email='', job_title='@co.com', hashed_password='password', icon_url=''),
]

def seed_users():
    db.session.add_all(seeded_users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
