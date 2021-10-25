const mongoose = require("mongoose");

const statistics = new mongoose.Schema({
    year: {
        type: Number,
        required: true
    },
    data: {
        type: {},
        required: true
    }
});

module.exports = new mongoose.model('statistics', statistics);