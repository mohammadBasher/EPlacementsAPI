const express = require("express");

const {authAdmin} = require("../../controllers/authAdmin");

const router = express.Router();

module.exports = router.post('/authAdmin',authAdmin);
