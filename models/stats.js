const mongoose = require("mongoose");

const stats = new mongoose.Schema({
    year:{
        type: Number,
        required: true
    },
    data:{
        type: {},
        required: true
    }
});

module.exports = new mongoose.model('stats', stats);
