const mongoose = require("mongoose");

const details = new mongoose.Schema({
    student_id:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    school_10:{
        type:String
    },
    board_10:{
        type:String
    },
    year_10:{
        type:String
    },
    percent_10:{
        type:Number
    },
    school_12:{
        type:String
    },
    board_12:{
        type:String
    },
    year_12:{
        type:String
    },
    percent_12:{
        type:Number
    },
    spi_array:{
        type: []
    },
    cpi:{
        type:Number
    },
    backlogs:{
        type:[]
    },
    project_title:{
        type:[]
    },
    project_desc:{
        type:[]
    },
    intern_title:{
        type:[]
    },
    intern_desc:{
        type:[]
    }
});

module.exports = new mongoose.model('details',details);

