const mongoose = require("mongoose");

const contact = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "TPR"
    },
    degree_course: {
        type: String,
        default: ""
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

module.exports = new mongoose.model('contact', contact);