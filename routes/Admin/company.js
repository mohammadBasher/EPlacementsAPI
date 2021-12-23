const express = require("express");

const { addCompany } = require("../../controllers/Admin/company");

const router = express.Router();

const add = router.post('/addCompany', addCompany);

module.exports = {
    addCompany: add
}