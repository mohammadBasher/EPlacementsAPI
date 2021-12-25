const express = require("express");

const { updateStudent, updatePhoto, updateResume, changePassword } = require("../../controllers/Student/profile");

const router = express.Router();

const student = router.post('/updateStudent', updateStudent);
const photo = router.post('/updatePhoto', updatePhoto);
const resume = router.post('/updateResume', updateResume);
const password = router.post('/changePassword', changePassword);

module.exports = {
    updateStudent: student,
    updatePhoto: photo,
    updateResume: resume,
    changePassword: password
}