const express = require("express");

const { loginStudent, registerStudent, updateStudent, updatePhoto, updateResume, changePassword } = require("../../controllers/Student/profile");

const router = express.Router();

const login = router.post('/loginStudent', loginStudent);
const register = router.post('/registerStudent', registerStudent);
const student = router.post('/updateStudent', updateStudent);
const photo = router.post('/updatePhoto', updatePhoto);
const resume = router.post('/updateResume', updateResume);
const password = router.post('/changePassword', changePassword);

module.exports = {
    loginStudent: login,
    registerStudent: register,
    updateStudent: student,
    updatePhoto: photo,
    updateResume: resume,
    changePassword: password
}