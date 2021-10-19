const express = require("express");

const {currentOpening} = require("../controllers/currentOpening");

const router = express.Router();

module.exports = router.get('/currentOpening',currentOpening);
