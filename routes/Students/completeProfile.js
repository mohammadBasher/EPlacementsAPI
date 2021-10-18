const express = require("express");

// setting up multer
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

const {completeProfile} = require("../../controllers/Student/completeProfile");

const router = express.Router();

module.exports = router.post('/completeProfile',upload.array('files'),completeProfile);
