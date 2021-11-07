const express = require("express")

const { changePassword } = require("../../controllers/Admin/changePassword")

const router = express.Router();

module.exports = router.post('/changePassword', changePassword);