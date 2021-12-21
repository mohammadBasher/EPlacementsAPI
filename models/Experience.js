// Schema for interview experiences
const mongoose = require("mongoose");

const experience = new mongoose.Schema({
    year: {
        type: String,
        required: true
    },
    reg_no: {
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    company_name: {
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
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    desc: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

module.exports = new mongoose.model('experience', experience);