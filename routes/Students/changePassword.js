const express = require("express")

const { changePassword } = require("../../controllers/Student/changePassword")

const router = express.Router();

// upload is a middle to upload the photo in the public folder
module.exports = router.post('/changePassword', changePassword);
