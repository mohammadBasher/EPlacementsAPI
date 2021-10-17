const mongoose = require("mongoose");

const company = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    job_profile : {
        type : String,
        required : true
    },
    job_location : {
        type : String,
        required : true,
    },
    job_desc : {
        type : String,
        required : true
    },
    provision_ppo : {
        type : String,
        required : true,
    },
    process : {
        type : String,
        required : true
    },
    ctc : {
        type : Number,
    },
    allowed_branches : {
        type : Array,
        required : true
    },
    reg_deadline : {
        type : Date,
        required : true
    },
    total_students : {
        type : Number,
        required : true
    },
    company_link : {
        type : String,
        required : true
    },
    eligibility_criteria : {
        type : String,
        required : true
    },
    min_cpi : {
        type : Number,
        required : true
    },
    min_10 : {
        type : Number,
        required : true
    },
    min_12 : {
        type : Number,
        required : true
    },
    gap_allowed : {
        type : Number,
        required : true
    },
    remarks : {
        type : String,
        required : true
    },
});

module.exports = new mongoose.model('company', company);

