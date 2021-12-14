const express = require("express");

const { resolveGrievance } = require("../../controllers/Admin/resolveGrievance");

const router = express.Router();

module.exports = router.post('/resolveGrievance', resolveGrievance);