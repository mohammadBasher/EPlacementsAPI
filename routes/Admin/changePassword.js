const express = require("express")

const { changePassword } = require("../../controllers/admin/changePassword")

const router = express.Router();

module.exports = router.post('/changePassword', changePassword);