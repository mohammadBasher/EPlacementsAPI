const express = require("express");

const { reduceCredit } = require("../../controllers/Admin/reduceCredit");

const router = express.Router();

module.exports = router.post('/reduceCredit', reduceCredit);
