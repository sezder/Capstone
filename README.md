
# Headquarters (HQ)

Headquarters is a loose clone of Basecamp, a team project management software. Users can collaborate with their teams and organize themselves via projects. Every project has a message board where team members can share their thoughts and sollicit feedback. Each project also includes todo lists.

Because the project is highly team-oriented and geared toward collaboraion, teammates can modify todos, lists, and projects that they're assigned to. Although Basecamp has distinctions for admin vs. regular user access when it comes to modifying content that is not your own, that's a layer of complexity I chose not to pursue. 

This project has been a testament to the fact that I am a quick and accurate developer. Only two full-CRUD features were required to pass given a two-week sprint, and I was able to complete that within a few days. In about half of the time allotted, I was able to achieve not only my minimally viable product, but most of my stretch goals as well. I was able to knock out so many features that the rubric didn't accomodate grading all of it.

TODO: Challenges I faced: 
- accessibility concerns 
- conditionally rendering forms in palce of content
- nesting doll navigation
- information-heavy-based design: prev. relied on photos to liven it up, looked very empty for brand new project


## Features
- Create an account, sign in, or log in as a demo user
- Create, view, edit, and delete
   - Projects
   - Messages
   - Comments
   - Todo lists
   - Todos  
- Project assignments
- Todo assignments

Upcoming features: 
- Users can view their assigned todos on a user dashboard

## Technologies Used
- React
- Redux 
- Python
- PostgreSQL
- Flask SQLAlchemy


# Splash page
From the splash page, one of the only pages accessible without authentication, allows users to choose to create an account, log into an existing account, or log in as a demo user. It features previews of the site to entice users to sign up. 
TODO: INSERT PHOTO

# Projects
Users can organize their teams into projects, assigning only the individuals who are stakeholders in the project.
TODO: INSERT PHOTO

# Message Board
The message board is comprised of messages on which people can leave comments. It's intended to help solve the issue of emails on various subjects all coming to the same place. 
TODO: PHOTO OF /messages
TODO: PHOTO OF /messages/:id
TODO: PHOTO OF /messages/new

# Todo Lists
Todos for a project can be categorized into lists and assigned to particular individuals so that nothing falls through the cracks. 
TODO: PHOTO OF /lists
TODO: PHOTO OF /lists/:id

------------------------------------------------

# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   If you add any python dependencies to your pipfiles, you'll need to regenerate your requirements.txt before deployment.
   You can do this by running:

   ```bash
   pipenv lock -r > requirements.txt
   ```

*ALSO IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on apline-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

## Deploy to Heroku

1. Before you deploy, don't forget to run the following command in order to
ensure that your production environment has all of your up-to-date
dependencies. You only have to run this command when you have installed new
Python packages since your last deployment, but if you aren't sure, it won't
hurt to run it again.

   ```bash
   pipenv lock -r > requirements.txt
   ```

2. Create a new project on Heroku
3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres"
4. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
5. Run

   ```bash
   heroku login
   ```

6. Login to the heroku container registry

   ```bash
   heroku container:login
   ```

7. Update the `REACT_APP_BASE_URL` variable in the Dockerfile.
   This should be the full URL of your Heroku app: i.e. "https://flask-react-aa.herokuapp.com"
8. Push your docker container to heroku from the root directory of your project.
   (If you are using an M1 mac, follow [these steps below](#for-m1-mac-users) instead, then continue on to step 9.)
   This will build the Dockerfile and push the image to your heroku container registry.

   ```bash
   heroku container:push web -a {NAME_OF_HEROKU_APP}
   ```

9. Release your docker container to heroku

      ```bash
      heroku container:release web -a {NAME_OF_HEROKU_APP}
      ```

10. set up your database

      ```bash
      heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
      heroku run -a {NAME_OF_HEROKU_APP} flask seed all
      ```

11. Under Settings find "Config Vars" and add any additional/secret .env
variables.

12. profit

### For M1 Mac users

(Replaces **Step 8**)

1. Build image with linux platform for heroku servers. Replace
{NAME_OF_HEROKU_APP} with your own tag:

   ```bash=
   docker buildx build --platform linux/amd64 -t {NAME_OF_HEROKU_APP} .
   ```

2. Tag your app with the url for your apps registry. Make sure to use the name
of your Heroku app in the url and tag name:

   ```bash=2
   docker tag {NAME_OF_HEROKU_APP} registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```

3. Use docker to push the image to the Heroku container registry:

   ```bash=3
   docker push registry.heroku.com/{NAME_OF_HEROKU_APP}/web
   ```
