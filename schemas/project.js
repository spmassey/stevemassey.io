var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        trim: true
    },
    began: {
        type: Date,
        default: Date.now
    }
});

module.exports = projectSchema;