from app.models import db, Message

seeded_messages = [
    Message(subject_line='Lorem ipsum', content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', project_id=1, creator_id=1),
    Message(subject_line='Phasellus interdum egestas venenatis.', content='Maecenas blandit malesuada ultrices. Aenean quam ex, placerat at ultricies ut, sagittis vel velit. Maecenas luctus augue suscipit iaculis tincidunt. Aliquam finibus porttitor augue, scelerisque sodales quam dignissim sit amet. Sed sollicitudin, turpis ut lacinia facilisis, arcu diam interdum augue, et ultrices lacus ligula quis lectus. Pellentesque vel metus a nisi euismod dignissim. Praesent sollicitudin dolor in sem condimentum, nec commodo augue pellentesque. Nam vitae quam eget tortor porttitor accumsan. Duis ornare augue in urna ullamcorper, eu ultrices justo tempus. Nullam quam tellus, posuere at tellus eu, semper porta odio. Vestibulum justo elit, eleifend at tortor non, consectetur posuere sapien. Nam eu dapibus purus. Vestibulum non rhoncus urna.', project_id=1, creator_id=2),
    Message(subject_line='Nam nec enim', content='Nam nec enim quis neque tempor scelerisque a sit amet leo. Fusce pharetra maximus ante quis volutpat. Quisque varius euismod turpis. Nullam eleifend lacus vel erat congue, at ullamcorper sem suscipit. Nam mollis ipsum pellentesque, dictum ipsum quis, ornare mi. Maecenas elementum auctor nibh, non porttitor urna sollicitudin nec. Vestibulum quis tellus eget libero tempor suscipit. Fusce purus erat, luctus vestibulum nisl eu, scelerisque facilisis ipsum. Vivamus porttitor leo et risus bibendum eleifend. Duis sed lectus cursus, placerat nisi et, tincidunt turpis. Sed vitae tortor sed lacus viverra efficitur non vitae urna.', project_id=1, creator_id=2),
  # Message(subject_line='', content='', project_id=, creator_id=),
]


def seed_messages():
  db.session.add_all(seeded_messages)
  db.session.commit()


def undo_messages():
  db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
  db.session.commit()
