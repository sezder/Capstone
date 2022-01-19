from flask.cli import AppGroup
from .users import seed_users, undo_users
from .projects import seed_projects, undo_projects
from .lists import seed_lists, undo_lists
from .todos import seed_todos, undo_todos
from .messages import seed_messages, undo_messages
from .comments import seed_comments, undo_comments
from .users_todos import seed_users_todos, undo_users_todos
from .users_projects import seed_users_projects, undo_users_projects



# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_projects()
    seed_lists()
    seed_todos()
    seed_messages()
    seed_comments()
    seed_users_todos()
    seed_users_projects()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users_projects()
    undo_users_todos()
    undo_comments()
    undo_messages()
    undo_todos()
    undo_lists()
    undo_projects()
    undo_users()
    # Add other undo functions here
