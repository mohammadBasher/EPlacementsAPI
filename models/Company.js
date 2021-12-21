// Schema for Company details
const mongoose = require("mongoose");

const company = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    job_profile: {
        type: String,
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    job_desc: {
        type: String,
        required: true
    },
    provision_ppo: {
        type: String,
        required: true
    },
    process: {
        type: String,
        required: true
    },
    ctc: {
        type: Number,
        default: 0
    },
    allowed_branches: {
        type: Array,
        required: true
    },
    reg_deadline: {
        type: Number,
        required: true
    },
    total_students: {
        type: Number,
        default: 0
    },
    company_link: {
        type: String,
        default: "NA"
    },
    eligibility_criteria: {
        type: String,
        default: "NA"
    },
    min_cpi: {
        type: Number,
        required: true
    },
    min_10: {
        type: Number,
        required: true
    },
    min_12: {
        type: Number,
        required: true
    },
    gap_allowed: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        default: "NA"
    },
    status: {
        type: String,
        default: "Open for registration"
    }
});

module.exports = new mongoose.model('company', company);