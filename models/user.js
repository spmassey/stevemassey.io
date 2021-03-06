var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: { type: String },
    password: { type: String },
    email: { type: String },
    name: { type: String },
    enabled: { type: Boolean, default: true },
    admin: { type: Boolean, default: false},
    lastLogin: { type: Date }
});

module.exports = mongoose.model('Users', UserSchema);