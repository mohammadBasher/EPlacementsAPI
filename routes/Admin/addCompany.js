const express = require("express");

const { addCompany } = require("../../controllers/Admin/addCompany");

const router = express.Router();

module.exports = router.post('/addCompany', addCompany);
