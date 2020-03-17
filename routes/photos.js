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
    gfs.files.find({ filename: req.params.fileName }).toArray((err, files) => {
        return res.json(files);
    });
});

module.exports = router;