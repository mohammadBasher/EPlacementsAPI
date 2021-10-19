const mongoose = require("mongoose");

const company = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    job_profile : {
        type : String,
        required : true,
        default:"SDE"
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
        default: 10
    },
    allowed_branches : {
        type : Array,
        required : true,
        default:"NA"
    },
    reg_deadline : {
        type : Number,
        required : true,
        default : new Date().getTime() + 24*60*60*1000
    },
    total_students : {
        type : Number,
        required : true,
        default: 0
    },
    company_link : {
        type : String,
        required : true,
        default:"NA"
    },
    eligibility_criteria : {
        type : String,
        required : true,
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
        required : true,
        default: "NA"
    },
});

module.exports = new mongoose.model('company', company);

