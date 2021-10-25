const express = require("express")

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

//importing controler for registering admin
const { updateResume } = require("../../../controllers/Student/update/updateResume")

const router = express.Router();

// upload is a middle to upload the photo in the public folder
module.exports = router.post('/updateResume', upload.single('resume'), updateResume);