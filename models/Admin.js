const mongoose = require("mongoose");

const admin = new mongoose.Schema({
    name : String,
    email : {
        type:String
    },
    password : String,
    photo:{
        data : Buffer,
        contentType : String
    }
});

module.exports = new mongoose.model('admin',admin);

