const mongoose = require("mongoose");

const student = new mongoose.Schema({
    reg_no: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: "Update your name"
    },
    course: {
        type: String,
        default: ""
    },
    branch: {
        type: String,
        default: ""
    },
    dob: {
        type: String,
        default: "01/01/2000"
    },
    email: {
        type: String,
        default: ""
    },
    skype_id: {
        type: String,
        default: ""
    },
    linkedin_id: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        default: ""
    },
    physically_challenged: {
        type: Boolean,
        default: false
    },
    residential_status: {
        type: String,
        default: "Hosteller"
    },
    guardian: {
        type: String,
        default: ""
    },
    present_address: {
        type: String,
        default: ""
    },
    permanent_address: {
        type: String,
        default: ""
    },
    maritial_status: {
        type: Boolean,
        default: false
    },
    state: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    photo: {
        type: String,
        default: ""
    },
    resume: {
        type: String,
        default: ""
    },
    credits: {
        type: Number,
        default: 10
    },
    status: {
        type: String,
        default: "registered"
    },
    remarks: {
        type: String,
        default: ""
    },
    school_10: {
        type: String,
        default: ""
    },
    board_10: {
        type: String,
        default: ""
    },
    year_10: {
        type: Number,
        default: 0
    },
    percent_10: {
        type: Number,
        default: 0
    },
    school_12: {
        type: String,
        default: ""
    },
    board_12: {
        type: String,
        default: ""
    },
    year_12: {
        type: Number,
        default: 0
    },
    percent_12: {
        type: Number,
        default: 0
    },
    spi_array: {
        type: Array,
        default: []
    },
    cpi: {
        type: Number,
        default: 0
    },
    backlogs: {
        type: Number,
        default: 0
    },
    project_title: {
        type: String,
        default: ""
    },
    project_desc: {
        type: String,
        default: ""
    },
    intern_title: {
        type: String,
        default: ""
    },
    intern_desc: {
        type: String,
        default: ""
    }
});

module.exports = new mongoose.model('student', student);