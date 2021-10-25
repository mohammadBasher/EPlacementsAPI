const express = require("express");

const { addNotice } = require("../../controllers/Admin/addNotice");

const router = express.Router();

module.exports = router.post('/addNotice', addNotice);