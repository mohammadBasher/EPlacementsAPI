const express = require("express")

//importing controler for registering admin
const { updateResume } = require("../../../controllers/Student/update/updateResume")

const router = express.Router();

// upload is a middle to upload the photo in the public folder
module.exports = router.post('/updateResume', updateResume);