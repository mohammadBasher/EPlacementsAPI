const express = require("express");

const { getStudents, setStatus, reduceCredit } = require("../../controllers/Admin/student");

const router = express.Router();

const get = router.post('/getStudents', getStudents);
const set = router.post('/setStatus', setStatus);
const reduce = router.post('/reduceCredit', reduceCredit);

module.exports = {
    getStudents: get,
    setStatus: set,
    reduceCredit: reduce
}