const express = require("express")

const { changePassword } = require("../../controllers/Student/changePassword")

const router = express.Router();

module.exports = router.post('/changePassword', changePassword);