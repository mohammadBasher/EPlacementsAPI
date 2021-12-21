const express = require("express");

const { getInsights } = require("../../controllers/Admin/insights");

const router = express.Router();

const get = router.get('/getInsights', getInsights);

module.exports = {
    getInsights: get
}