const mongoose = require("mongoose");

const admin = new mongoose.Schema({
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
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String,
        default: ""
    }
});

module.exports = new mongoose.model('admin', admin);