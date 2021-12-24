const express = require("express");

const { getStudents, setStatus, reduceCredit, getDetail } = require("../../controllers/Admin/student");

const router = express.Router();

const get = router.post('/getStudents', getStudents);
const set = router.post('/setStatus', setStatus);
const reduce = router.post('/reduceCredit', reduceCredit);
const detail = router.post('/getDetail',getDetail);

module.exports = {
    getStudents: get,
    setStatus: set,
    reduceCredit: reduce,
    getDetail: detail
}