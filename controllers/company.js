
// This file contains functions for
// getCompany - to get the details of a company by its id
// currentOpening - to get companies available to register

const companyModel = require("../models/Company");

const getCompany = (req, res, next) => {
    const response = {};
    const id = req.body.id;
    // fetching all the notices 
    companyModel.findOne({ _id: id }, (err, company) => {
        // if some error occurred return from here
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }
        // return fetched notices with the response
        response.success = true;
        response.message = "Company fetched successfully";
        response.company = company;
        return res.send(response);
    })
}

const currentOpening = (req, res, next) => {
    const response = {};
    // storing current time
    const currentTime = new Date().getTime();
    // fetching all the companies with deadline greater than current time
    companyModel.find({ reg_deadline: { $gt: currentTime } }, (err, company) => {
        if (err) {
            // if some error occurred return from here
            console.log(err);
            response.success = false;
            response.message = "Some error occurred ";
            return res.send(response);
        }
        // return all fetched companies with the response
        response.success = true;
        response.message = "Current opening fetched successfully";
        response.company = company;
        return res.send(response);
    })
}

module.exports = {
    getCompany,
    currentOpening
}