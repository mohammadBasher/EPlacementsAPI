const mongoose = require("mongoose");

const details = new mongoose.Schema({
    student_id : {
        type : mongoose.SchemaTypes.ObjectId,
        required : true
    }
});

module.exports = new mongoose.model('details', details);

