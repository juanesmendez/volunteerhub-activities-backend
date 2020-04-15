# VolunteerHub Mobile App Activities Database 🌎🎗

This repository contains the back-end code of the VolunteerHub Mobile App. It was developed with Node.js using Express. VolunteerHub is an app for iOS and Android, that offers volunteers a platform in which they can easily find volunteer activities around their area that they can join and start helping others right way!

### Javacript libraries and frameworks used 📚

- Express 
- Mongoose 🦆
- Env 

### Database engine

- MongoDB 

## API endpoints

All of the API (REST) requests return a JSON response.

- `/activities`: returns a JSON with all of the activities in the database. (`POST` and `GET` requests supported)
    * In the `/models` folder, you can find the structure of the `Activity` object, in order to send the correct attributes as `params` in the `POST` request.
- `/activities/{id}`: returns a JSON containing an activity with the corresponding `id` if it is found in the database. (`GET` and `PUT` requests supported)
- `/photos`: returns all of the photos in the database associated with the activities. (`GET` requests supported)
    * Photos are automatically created when a `POST` request is sent to the `/activities` endpoint, passing an image file as a `param`.
- `/photos/{fileName}`: returns a JSON containing the information of a photo associated with an activity, if it is found in the database. (`GET` requests supported)

## How to run the project? 👨🏻‍💻

In order for the project to work, you have to create a sandbox database in MongoDB. You also need to install `node package manager`. After doing this, you have to follow the steps shown below:

1. Create an environment variable called `DB_CONNECTION` in your server, with the `URL`of your remote Mongo database. The URL looks something like this: `mongodb+srv://<your-username>:<your-password>@<sandbox-name>-qudpf.mongodb.net/test?retryWrites=true&w=majority%`
2. Run `npm install`.
3. Run `npm start`.
