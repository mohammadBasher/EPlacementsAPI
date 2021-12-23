const express = require("express");

const { searchStudent } = require("../../controllers/Student/search");

const router = express.Router();

const search = router.get('/searchStudent', searchStudent);

module.exports = {
    searchStudent: search
}