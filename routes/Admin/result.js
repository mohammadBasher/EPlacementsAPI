const express = require("express");

const { addResult,loadCompanies,loadStudents } = require("../../controllers/Admin/result");

const router = express.Router();

const add = router.post('/addResult', addResult);
const load = router.get('/loadCompanies',loadCompanies);
const student  = router.post('/loadStudents',loadStudents);

module.exports = {
    addResult: add,
    loadCompanies: load,
    loadStudents: student
}
