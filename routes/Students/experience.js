const express = require("express");

const { addExperience, getExperience, checkEligibility } = require("../../controllers/Student/experience");

const router = express.Router();

const register = router.post('/addExperience', addExperience);
const getCompanies = router.get('/getExperience', getExperience);
const check = router.get('/checkEligibility', checkEligibility);

module.exports = {
    addExperience: register,
    getExperience: getCompanies,
    checkEligibility: check
}