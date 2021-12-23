// This file contains Functions for
// addCompany - to add a company

const companyModel = require("../../models/Company");

const addCompany = (req, res, next) => {
    // fetching company's data from the request
    const data = req.body;
    const response = {};
    const name = data.name;
    const job_profile = data.job_profile;
    const job_location = data.job_location;
    // checking wheather a company already registered with that name, profile and location
    companyModel.findOne({ name, job_profile, job_location }, (err, company) => {
        // return if some error occurrs
        if (err) {
            console.log(err);
            response.success = false;
            response.msg = "An error occured, try again";
            return res.send(response);
        }
        // return if a company already exists
        else if (company) {
            console.log(err);
            response.success = false;
            response.msg = "Company already exists with given name and job profile";
            return res.send(response);
        }
        else {
            // Now create a newCompany with given data and save it
            const newCompany = new companyModel(data);
            newCompany.save((err, company) => {
                // if some error occurred return from here 
                if (err) {
                    console.log(err);
                    response.success = false;
                    response.message = "An error occured, try again";
                    return res.send(response);
                }
                // Now return saved company's details with the response
                response.success = true;
                response.message = "Company added successfully";
                response.company = company;
                return res.send(response);
            })
        }
    });
}

module.exports = {
    addCompany
}