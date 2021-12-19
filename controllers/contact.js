
// This file contains functions for
// getContact - to get the contact details of TPRs

const contactModel = require("../models/Contact");

const getContact = (req, res, next) => {
    const response = {};
    // fetching all the notices 
    contactModel.find({}, (err, contact) => {
        // if some error occurred return from here
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }
        // return fetched notices with the response
        response.success = true;
        response.message = "Contact fetched successfully";
        response.contacts = contact;
        return res.send(response);
    })
}

module.exports = {
    getContact
}