const mongoose = require("mongoose");

const registration = new mongoose.Schema({
    company_id : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    student_id : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    },
    status : {
        type : String,
        default : "registered"
    },
    remarks : {
        type : String,
        default : true
    }
});

module.exports = new mongoose.model('registration', registration);

