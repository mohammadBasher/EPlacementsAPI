const express = require("express");

const { studentPlaced } = require("../../controllers/Admin/studenPlaced");

const router = express.Router();

module.exports = router.post('/studentPlaced', studentPlaced);
