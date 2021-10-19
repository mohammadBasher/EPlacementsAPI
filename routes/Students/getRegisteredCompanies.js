const express = require("express");

const {getRegisteredCompanies} = require("../../controllers/Student/getRegisteredCompanies");

const router = express.Router();

module.exports = router.get('/getRegisteredCompanies', getRegisteredCompanies);
