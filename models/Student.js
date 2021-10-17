const mongoose = require("mongoose");

const student = new mongoose.Schema({
    reg_no:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    course:{
        type:String
    },
    branch:{
        type:String
    },
    dob:{
        type:String
    },
    email:{
        type:String
    },
    skype_id:{
        type:String
    },
    linkedin_id:{
        type:String
    },
    gender:{
        type:String
    },
    category:{
        type:String
    },
    physically_challenged:{
        type:Boolean
    },
    residential_status:{
        type:String
    },
    guardian:{
        type:String
    },
    present_address:{
        type:String
    },
    permanent_address:{
        type:String
    },
    maritial_status:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    photo:{
        data : Buffer,
        contentType : String
    },
    resume:{
        data : Buffer,
        contentType : String
    },
    credits:{
        type:Number
    },
    status:{
        type:String
    },
    remarks:{
        type:String
    },
    details_id:{
        type:mongoose.Schema.Types.ObjectId
    }
});

module.exports = new mongoose.model('student',student);

