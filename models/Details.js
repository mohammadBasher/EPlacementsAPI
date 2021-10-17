const mongoose = require("mongoose");

const details = new mongoose.Schema({
    student_id : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    },
    school_10 : {
        type : String
    },
    board_10 : {
        type : String
    },
    year_10 : {
        type : Number
    },
    percent_10 : {
        type : Number
    },
    school_12 : {
        type : String
    },
    board_12 : {
        type : String
    },
    year_12 : {
        type : Number
    },
    percent_12 : {
        type : Number
    },
    spi_array : {
        type : Array
    },
    cpi : {
        type : Number
    },
    backlogs : {
        type : Number
    },
    project_title : {
        type : String
    },
    project_desc : {
        type : String
    },
    intern_title : {
        type : String
    },
    intern_desc : {
        type : String
    }
});

module.exports = new mongoose.model('details', details);

