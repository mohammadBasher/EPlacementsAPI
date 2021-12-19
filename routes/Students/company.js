const express = require("express");

const { registerForCompany,getRegisteredCompanies } = require("../../controllers/Student/company");

const router = express.Router();

const register = router.post('/registerForCompany', registerForCompany);
const getCompanies = router.post('/getRegisteredCompanies',getRegisteredCompanies);

module.exports = {
    registerForCompany: register,
    getRegisteredCompanies: getCompanies
}
