const express = require("express");

const { getGrievance } = require("../../controllers/Admin/getGrievance");

const router = express.Router();

module.exports = router.get('/getGrievance', getGrievance);