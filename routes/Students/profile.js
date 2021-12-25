const express = require("express");

const { loginStudent, registerStudent } = require("../../controllers/Student/profile");

const router = express.Router();

const login = router.post('/loginStudent', loginStudent);
const register = router.post('/registerStudent', registerStudent);

module.exports = {
    loginStudent: login,
    registerStudent: register
}