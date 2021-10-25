const express = require("express");

const { registerStudent } = require("../../controllers/Student/registerStudent");

const router = express.Router();

module.exports = router.post('/registerStudent', registerStudent);