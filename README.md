## Project structure

There are two parts of this project which are frontend and backend

### Frontend

There are two routes on front end which are `/signup` and `/brokerlist`

To be able to run front-end in debug mode, you should `npm install` and `npm start` respectively.

### Backend

There are two routes on back end which are `/signup` and `/list`

To be able to run back-end in debug mode, you should run `export FLASK_APP=app.py` from backend folder and run `flask run` respectively.

Back end uses sqlite database, so the database is initialized automatically when whe app is run for the first time.
