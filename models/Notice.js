const mongoose = require("mongoose");

const notice = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        default: new Date().getTime()
    }
});

module.exports = new mongoose.model('notice', notice);