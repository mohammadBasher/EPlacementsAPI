const express = require("express");

const { updateStudent } = require("../../../controllers/Student/update/updateStudent");

const router = express.Router();

module.exports = router.post('/updateStudent', updateStudent);