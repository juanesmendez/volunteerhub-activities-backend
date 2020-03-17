const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const path = require('path')
const crypto = require('crypto');
const cors = require('cors');
require('dotenv/config');

const Activity = require('./models/Activity');

//MIDDLEWARES
//Parses every request body into a json
app.use(bodyParser.json());
// Method override
//Query stream to make a query stream when we create our form

//app.use(methodOverride('_method'));

// To allow petitions from any domain
app.use(cors());

// Import Routes
const activititesRoute = require('./routes/activities');
const photosRoute = require('./routes/photos');

app.use('/activities', activititesRoute);
app.use('/photos', photosRoute);

// Routes
app.get('/', (req, res) => {
    res.send('We are on home!');
});


// DB connection
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log('Connected to DB!')
);

// Server listening port
app.listen(3000);

