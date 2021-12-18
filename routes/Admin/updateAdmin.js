const express = require("express")

const { updateAdmin } = require("../../controllers/Admin/updateAdmin")

const router = express.Router();

module.exports = router.post('/updateAdmin', updateAdmin);