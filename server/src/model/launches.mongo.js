const mongoose = require('mongoose');

const launchSchema = new mongoose.Schema({
    flightNumber: {
        type: Number,
        required: true
    },
    mission: {
        type: String,
        required: true
    },
    rocket: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date,
        required: true
    },
    target: {
        type: String,
        // required: true
    },
    customers: [String,],
    upcoming: {
        type: Boolean,
        required: true
    },
    success: {
        type: Boolean,
        required: true,
        default: true
    },
});

// connects launchSchema with "launches" collection
const launchesModel = mongoose.model('Launch', launchSchema); // The name given is lowercased then pluralized by mongo
module.exports = launchesModel;