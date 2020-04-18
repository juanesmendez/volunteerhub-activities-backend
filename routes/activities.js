const express = require('express');
const router = express.Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const methodOverride = require('method-override');
const path = require('path')
const crypto = require('crypto');
const Activity = require('../models/Activity');

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.DB_CONNECTION,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                // Think about how the file name could start with the id of the activity
                console.log(req.body.activityId);
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'photos'
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({ storage });

// GET BACK ALL OF THE ACTIVITIES
router.get('/', (req, res) => {
    console.log("Received GET request for /activities/")
    Activity.find({})
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

// SUBMITS AN ACTIVITY
router.post('/', upload.array('images'), (req, res) => {
    //console.log(req.files);
    // Creating the array of images of the activity
    var images = [];
    req.files.map((val, index) => {
        images.push({
            fileName: val.filename
        });
    });
    console.log(images);
    const activity = new Activity({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        volunteersNeeded: req.body.volunteersNeeded,
        //volunteersAttending: req.body.volunteersAttending,
        volunteersAttending: 0,
        date: req.body.date,
        images: images,
        volunteers: []
    });
    // Save the activity in the database
    console.log("we are here");
    console.log(req.body);
    activity.save()
        .then(data => {
            console.log(data);
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

//GET AN SPECIGIC ACTIVITY
router.get('/:activityId', (req, res) => {
    console.log(`Received GET request for /activities/${req.params.activityId}`)
    //console.log(req.params.activityId);
    Activity.findById(req.params.activityId)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

//DELETE AN ACTIVITY
router.delete('/:activityId', (req, res) => {
    Activity.deleteOne({ _id: req.params.activityId })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

//UPDATE AN ACTIVITY
router.put('/:activityId', (req, res) => {
    console.log(`Received PUT request for /activities/${req.params.activityId}`)
    console.log(req.body)
    Activity.updateOne({ _id: req.params.activityId }, req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

module.exports = router;