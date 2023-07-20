const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    toggl_api_key: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('user', UserSchema);
