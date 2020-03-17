const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    volunteersNeeded: Number,
    date: {
        type: Date
    },
    images: [{
        fileName: String
        // We could add a description to each image
    }]
});

module.exports = mongoose.model('Activities', ActivitySchema);