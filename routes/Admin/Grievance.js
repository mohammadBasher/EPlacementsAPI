const express = require("express");

const { getGrievance,resolveGrievance } = require("../../controllers/Admin/Grievance");

const router = express.Router();

const get = router.post('/getGrievance', getGrievance);
const resolve = router.post('/resolveGrievance',resolveGrievance);

module.exports = {
    getGrievance: get,
    resolveGrievance: resolve
}
