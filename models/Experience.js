const mongoose = require("mongoose");

const experience = new mongoose.Schema({
    year : {
        type : String,
        required : true
    },
    student_id : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    student_name : {
        type : String,
        required : true,
        default : "NA"
    },
    company_name : {
        type : String,
        required : true,
        default : "NA"
    },
    job_profile : {
        type : String,
        required : true,
        default : "NA"
    },
    job_location : {
        type : String,
        required : true,
        default : "NA"
    },
    rating : {
        type : Number,
        min : 1,
        max : 5
    },
    desc : {
        type : String,
        required : true,
        default : "NA"
    },
    timestamp : {
        type : Number,
        required : true,
        default : new Date().getTime()
    }
});

module.exports = new mongoose.model('experience', experience);

