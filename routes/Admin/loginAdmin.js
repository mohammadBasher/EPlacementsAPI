const express = require("express");

const {loginAdmin} = require("../../controllers/Admin/loginAdmin");

const router = express.Router();

module.exports = router.post('/loginAdmin',loginAdmin);
