const express = require("express");

const {authStudent} = require("../../controllers/Student/authStudent");

const router = express.Router();

module.exports = router.post('/authStudent',authStudent);
