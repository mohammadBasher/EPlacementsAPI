const express = require("express");

// importing middleware
// const {authAdmin} = require("../../middleware/authAdmin")

const { addCompany } = require("../../controllers/Admin/addCompany");

const router = express.Router();

module.exports = router.post('/addCompany',addCompany);
