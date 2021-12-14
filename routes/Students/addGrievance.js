const express = require("express");

const { addGrievance } = require("../../controllers/Student/addGrievance");

const router = express.Router();

module.exports = router.post('/addGrievance', addGrievance);