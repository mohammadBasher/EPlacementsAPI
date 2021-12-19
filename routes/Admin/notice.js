const express = require("express");

const { addNotice } = require("../../controllers/Admin/notice");

const router = express.Router();

const add = router.post('/addNotice', addNotice);

module.exports = {
    addNotice: add
}
