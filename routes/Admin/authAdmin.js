const express = require("express");

const {authAdmin} = require("../../controllers/Admin/authAdmin");

const router = express.Router();

module.exports = router.post('/authAdmin',authAdmin);
