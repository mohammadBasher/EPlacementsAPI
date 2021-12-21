const express = require("express");

const { addCompany,addResult } = require("../../controllers/Admin/company");

const router = express.Router();

const add = router.post('/addCompany', addCompany);
const result = router.post('/addResult',addResult);

module.exports = {
    addCompany: add,
    addResult: result
}
