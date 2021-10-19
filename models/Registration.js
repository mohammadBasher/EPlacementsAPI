const mongoose = require("mongoose");

const registration = new mongoose.Schema({
    company_id : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    reg_no : {
        type : Number,
        required : true
    },
    year : {
        type : Number,
        required : true,
        default : 4
    },
    timestamp : {
        type : Number,
        default : new Date().getTime()
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

