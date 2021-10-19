const express = require("express");

const {loginStudent} = require("../../controllers/Student/loginStudent");

const router = express.Router();

module.exports = router.post('/loginStudent', loginStudent);
