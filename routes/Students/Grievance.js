const express = require("express");

const { addGrievance } = require("../../controllers/Student/grievance");

const router = express.Router();

const add = router.post('/addGrievance', addGrievance);

module.exports = {
    addGrievance: add
}