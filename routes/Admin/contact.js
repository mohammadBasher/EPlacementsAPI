const express = require("express");

const { addContact } = require("../../controllers/Admin/contact");

const router = express.Router();

const add = router.post('/addContact', addContact);

module.exports = {
    addContact: add
}