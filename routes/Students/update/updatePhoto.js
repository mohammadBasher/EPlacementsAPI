const express = require("express")

//importing controler for registering admin
const { updatePhoto } = require("../../../controllers/Student/update/updatePhoto")

const router = express.Router();

// upload is a middle to upload the photo in the public folder
module.exports = router.post('/updatePhoto', updatePhoto);