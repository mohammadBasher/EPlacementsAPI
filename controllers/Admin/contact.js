
// This file contains functions for
// addContact - to add contact details of a TPR

const contactModel = require("../../models/Contact");

const addContact = (req, res, next) => {
    const title = req.body.title;
    const content = req.body.content;
    const response = {};
    // creating and saving that contact in the Contact collection
    const newContact = new contactModel(req.body);
    newContact.save((err, contact) => {
        // return if some error occurrs
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "An error occurred, try again";
            return res.send(response);
        }
        // Now return saved contact with the response
        else {
            response.success = true;
            response.message = "Contact saved successfully";
            response.contact = contact;
            return res.send(response);
        }
    })
}

module.exports = {
    addContact
}