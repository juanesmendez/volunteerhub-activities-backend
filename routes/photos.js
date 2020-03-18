const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const path = require('path')
const crypto = require('crypto');
const Activity = require('../models/Activity');

let gfs;
mongoose.connection.once('open', () => {
    // Initialize stream
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('photos');
});

// GET ALL PHOTOS
router.get('/', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        return res.json(files);
    });
});

// GET AN SPECIFIC PHOTO
router.get('/:fileName', (req, res) => {
    gfs.files.findOne({ filename: req.params.fileName }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        // File exists
        return res.json(file);
    });
});

// GET AN IMAGE (image/:filename)
// It displays a single file object
router.get('/image/:fileName', (req, res) => {
    gfs.files.findOne({ filename: req.params.fileName }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: "No file exists"
            });
        }
        // Check if image
        if (file.contentType == 'image/jpeg' || file.contentType == 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: "Not an image"
            })
        }
    });
});

module.exports = router;