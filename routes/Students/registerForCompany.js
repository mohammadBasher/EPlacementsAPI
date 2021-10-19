const express = require("express");

const { registerForCompany } = require("../../controllers/Student/registerForCompany");

const router = express.Router();

module.exports = router.post('/registerForCompany',registerForCompany);
