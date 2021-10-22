const express = require("express");

const {addContact} = require("../../controllers/Admin/addContact");

const router = express.Router();

module.exports = router.post('/addContact', addContact);
