const mongoose = require("mongoose");

const registration = new mongoose.Schema({
    company_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    reg_no: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "registered"
    },
    remarks: {
        type: String,
        default: ""
    }
});

module.exports = new mongoose.model('registration', registration);