from app.models import db, Comment

seeded_comments = [
  Comment(content='Nam nec enim quis neque tempor scelerisque a sit amet leo. Fusce pharetra maximus ante quis volutpat. Quisque varius euismod turpis. Nullam eleifend lacus vel erat congue, at ullamcorper sem suscipit. Nam mollis ipsum pellentesque, dictum ipsum quis, ornare mi.', message_id=1, creator_id=1),
  Comment(content='Maecenas elementum auctor nibh, non porttitor urna sollicitudin nec. Vestibulum quis tellus eget libero tempor suscipit. Fusce purus erat, luctus vestibulum nisl eu, scelerisque facilisis ipsum. Vivamus porttitor leo et risus bibendum eleifend. Duis sed lectus cursus, placerat nisi et, tincidunt turpis. Sed vitae tortor sed lacus viverra efficitur non vitae urna.', message_id=1, creator_id=4),
  Comment(content='In hac habitasse platea dictumst. Cras id risus mi. Vestibulum vitae mollis odio. Donec mattis malesuada diam vel dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque leo ipsum, nec pharetra arcu egestas non.', message_id=1, creator_id=2),
  Comment(content='Mauris tincidunt tortor nec cursus euismod. Nullam aliquet ligula ut eros tincidunt, ut rhoncus risus consectetur. Fusce id commodo tellus. Ut ut enim eros. In turpis risus, ultrices non ligula nec, scelerisque convallis eros. Quisque eu mauris quam. Phasellus iaculis nec dolor ac molestie. Duis sed tempus nunc. Mauris scelerisque tortor sit amet sem consectetur, sit amet scelerisque elit suscipit.', message_id=2, creator_id=7),
  Comment(content='Integer efficitur lacinia lectus, a imperdiet orci. Maecenas cursus nisl augue. Aliquam erat volutpat. Etiam facilisis lacus vel sollicitudin facilisis. Ut accumsan ex ullamcorper, lacinia nisi eget, eleifend risus. Aenean egestas ornare sagittis.', message_id=2, creator_id=11),
  Comment(content='Sed quis ligula ut dui tincidunt egestas ut ut purus. In hac habitasse platea dictumst. Sed porta tortor eu justo efficitur commodo at eu enim. Aenean dolor eros, accumsan at leo a, tincidunt bibendum risus.', message_id=3, creator_id=7),
  Comment(content='Sed arcu tellus, lobortis ut convallis in, ultrices non massa. Aenean sodales ligula et tellus maximus pellentesque. Morbi quam erat, consectetur ac sagittis vitae, interdum at ligula. Nullam sit amet tellus sagittis, fringilla mi et, mollis lacus.', message_id=3, creator_id=1),
  Comment(content='Curabitur vel sapien eu lacus sollicitudin dignissim quis nec quam. Integer bibendum rutrum condimentum. Aliquam auctor et magna id dapibus. In tempus sodales ultrices.', message_id=3, creator_id=4),
  # Comment(content='', message_id=, creator_id=),

]


def seed_comments():
  db.session.add_all(seeded_comments)
  db.session.commit()


def undo_comments():
  db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
  db.session.commit()
