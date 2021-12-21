// This file contains Functions for
// addCompany - to add a company
// addResult - to anounce result for a company

const companyModel = require("../../models/Company");
const registrationModel = require("../../models/Registration");
const studentModel = require('../../models/Student');

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

const addResult = async (req, res, next) => {
    const response = {};
    // fetching reg_nos and company id from request's body
    const reg_nos = req.body.reg_nos;
    const company_id = req.body.company_id;
    try {
        // traversing through all registration ids
        for (const reg_no of reg_nos) {
            const registration = await registrationModel.findOne({ reg_no });
            // if any of the registration is not found return
            if (!registration) {
                response.success = false;
                response.message = "Some of the Registrations are not found or student already placed";
                return res.send(response);
            }
            // set the status of the found registration as placed
            registration.status = "placed";
            // find the student with registration number
            const student = await studentModel.findOne({ reg_no });
            // check if the student already placed
            if (student.status == "placed") {
                response.success = false;
                response.message = "Some of the students are already placed";
                console.log("Some of the students are already placed");
                console.log(reg_no);
                return res.send(response);
            }
            console.log(student.status);
            // update his status to placed
            student.status = "placed";
            const updatedStudent = await studentModel.findOneAndUpdate({ reg_no }, student);
            const updatedRegistration = await registrationModel.findOneAndUpdate({ reg_no }, registration);
        }
        // find company with id
        const company = await companyModel.findOne({ _id: company_id });
        // if not found return from here
        if (!company) {
            response.success = false;
            response.message = "Company is not found with that company id";
            return res.send(response);
        }
        // set the status of company to result announced
        company.status = "result announced";
        companyModel.findOneAndUpdate({ _id: company_id }, company);
        response.success = true;
        response.message = "Results have been added successfully";
        // return success response
        return res.send(response);
    } catch (err) {
        console.log(err);
        response.success = false;
        response.message = "Some error occurred";
        return res.send(response);
    }
}

module.exports = {
    addCompany,
    addResult
}