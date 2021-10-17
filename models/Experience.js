const mongoose = require("mongoose");

const experience = new mongoose.Schema({
    year : {
        type : String,
        required : true,
        unique : true
    },
    student_id : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    student_name : {
        type : String,
        required : true
    },
    company_name : {
        type : String,
        required : true
    },
    job_profile : {
        type : String,
        required : true
    },
    job_location : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    desc : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
});

module.exports = new mongoose.model('experience', experience);

