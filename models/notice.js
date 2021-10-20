const mongoose = require("mongoose");

const notice = new mongoose.Schema({
    content:{
        type : String,
        required : true
    },
    time:{
        type: Number,
        default: new Date().getTime()
    }
});

module.exports = new mongoose.model('notice', notice);
