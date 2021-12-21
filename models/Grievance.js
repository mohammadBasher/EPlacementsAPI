// Schema for grievances
const mongoose = require("mongoose");

const grievance = new mongoose.Schema({
    reg_no: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "unresolved"
    }
});

module.exports = new mongoose.model('grievance', grievance);