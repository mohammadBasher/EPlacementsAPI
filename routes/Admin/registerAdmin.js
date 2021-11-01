const express = require("express")

//importing controler for registering admin
const { registerAdmin } = require("../../controllers/Admin/registerAdmin")

const router = express.Router();

// upload is a middle to upload the photo in the public folder
module.exports = router.post('/registerAdmin', registerAdmin);