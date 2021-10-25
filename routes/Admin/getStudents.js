const express = require("express");

const { getStudents, setStatus } = require("../../controllers/Admin/getStudents");

const router = express.Router();

const get = router.post('/getStudents', getStudents);
const set = router.post('/setStatus', setStatus);

module.exports = {
    getStudents: get,
    setStatus: set
}