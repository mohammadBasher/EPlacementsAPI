const mongoose = require("mongoose");

const company = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    job_profile : {
        type : String,
        required : true,
        default:"NA"
    },
    job_location : {
        type : String,
        required : true,
        default:"NA"
    },
    job_desc : {
        type : String,
        required : true,
        default:"NA"
    },
    provision_ppo : {
        type : String,
        required : true,
        default:"NA"
    },
    process : {
        type : String,
        required : true,
        default:"NA"
    },
    ctc : {
        type : Number,
        default: 0
    },
    allowed_branches : {
        type : Array,
        required : true,
        default:"NA"
    },
    reg_deadline : {
        type : Number,
        required : true,
        default : new Date().getTime()
    },
    total_students : {
        type : Number,
        required : true,
        default: 0
    },
    company_link : {
        type : String,
        default:"NA"
    },
    eligibility_criteria : {
        type : String,
        default:"NA"
    },
    min_cpi : {
        type : Number,
        required : true,
        default: 6
    },
    min_10 : {
        type : Number,
        required : true,
        default: 75
    },
    min_12 : {
        type : Number,
        required : true,
        default: 75
    },
    gap_allowed : {
        type : Number,
        required : true,
        default: 0
    },
    remarks : {
        type : String,
        default: "NA"
    },
});

module.exports = new mongoose.model('company', company);

