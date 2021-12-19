
// This file contain functions for
// registerForCompany - to register a student for a company
// getRegisteredCompanies - to get companies in which a student has already registered

const registerationModel = require("../../models/Registration");
const studentModel = require("../../models/Student");
const companyModel = require("../../models/Company");

const registerForCompany = async (req, res, next) => {
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // storing incoming information or information user want to update
    const data = req.body;
    try {
        const student = await studentModel.findOne({ reg_no });
        if (!student) {
            // If student is not found or some error occurred return 
            console.log("Student not found");
            response.success = false;
            response.message = "An error occurred, try again";
            return res.send(response);
        }
        else {
            if (password != student.password) {
                // If password doesn't match return with Invalid Password
                console.log("Invalid password");
                response.success = false;
                response.message = "Invalid password, login again";
                return res.send(response);
            }
            else if (student.credits < 4) {
                // If student's credits are less than 4 
                // then he will not be able to register for the company
                console.log("Credits less than 4");
                response.success = false;
                response.message = "Your credits are less than 4. So you are not eligible to apply";
                return res.send(response);
            }
            else if (student.backlogs > 0) {
                // If student has any active backlog
                // then he will not be able to register for the company
                console.log("Backlogs not allowed");
                response.success = false;
                response.message = "You have an active backlog. So you are not eligible to apply";
                return res.send(response);
            }
            else if (student.status != "verified") {
                // If student's status is not verified 
                // whether registered,completed,unverified or placed
                // then also he will not be able to register
                console.log("Profile not verified");
                response.success = false;
                response.message = "Your profile is not verified";
                return res.send(response);
            }
            else {
                // As student is eligible to apply
                // checking wheather student already registered for this company
                const registration = data;
                registration.reg_no = reg_no;
                registration.year = new Date().getFullYear();
                registration.timestamp = new Date().getTime();
                const ifRegister = await registerationModel.findOne({ company_id: data.company_id, reg_no: reg_no });
                if (!ifRegister) {
                    // if student not register till now
                    const company = await companyModel.findOne({ _id: data.company_id });
                    const deadline = company.reg_deadline;
                    const branch = company.allowed_branches;
                    // checking if user's branch is allowed in this company or not
                    if (branch.indexOf(student.branch) == -1) {
                        console.log("Branch not allowed");
                        response.success = false;
                        response.message = "Your branch is not allowed in this company";
                        return res.send(response);
                    }
                    // checking if user's cpi is fulfilling minimum condition or not
                    else if (company.min_cpi <= student.cpi) {
                        console.log("Cpi too less");
                        response.success = false;
                        response.message = "Your cpi is less than minimum cpi criteria";
                        return res.send(response);
                    }
                    // checking if user's 10 %` is fulfilling minimum condition or not
                    else if (company.min_10 <= student.percent_10) {
                        console.log("10th % too less");
                        response.success = false;
                        response.message = "Your 10th % is less than minimum % criteria";
                        return res.send(response);
                    }
                    // checking if user's 12 %` is fulfilling minimum condition or not
                    else if (company.min_12 <= student.percent_12) {
                        console.log("12th % too less");
                        response.success = false;
                        response.message = "Your 12th % is less than minimum % criteria";
                        return res.send(response);
                    }
                    // If registration deadline of the company is expired or not
                    else if (deadline < new Date().getTime()) {
                        console.log("Deadline expired");
                        response.success = false;
                        response.message = "Registration deadline expired";
                        return res.send(response);
                    }
                    else {
                        // creating rew registration
                        const newRegistration = new registerationModel(registration);
                        newRegistration.save((err, registration) => {
                            if (err) {
                                // if some error occurred return from here
                                console.log(err);
                                response.success = false;
                                response.message = "An error occurred";
                                return res.send(response);
                            }
                            else {
                                // now return registration details with the response
                                response.success = true;
                                response.message = "Registration completed successfully";
                                response.registration = registration;
                                return res.send(response);
                            }
                        })
                    }
                }
                else {
                    // As student already registered for this company return from here
                    response.success = false;
                    response.message = "You have already registered for this company";
                    return res.send(response);
                }
            }
        }

    } catch (err) {
        // return if some error occurs
        console.log(err);
        response.success = false;
        response.message = "An error occured";
        return res.send(response);
    }
}

const getRegisteredCompanies = async (req, res, next) => {
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    try {
        // fetching registered companies ids from registerationModel
        const companyIds = await registerationModel.find({ reg_no }, { company_id: 1, _id: 0, timestamp: 1 });

        if (!companyIds) {
            console.log(err);
            response.success = false;
            response.message = "An error occured while fetching registered companies";
            return res.send(response);
        }
        // an array to store company details
        const companies = [];
        // traving companyIds to find details of registered companies
        for (let i = 0; i < companyIds.length; i++) {
            const company_id = companyIds[i].company_id;
            const tmp = {};
            // storing details of registered companies fetched using company id
            tmp.company = await companyModel.findOne({ _id: company_id });
            // also adding time of registration in responses
            tmp.timestamp = companyIds[i].timestamp;
            // pushing it into companies array
            companies.push(tmp);
        }
        //finally returing response
        response.success = true;
        response.message = "Registered companies fetched successfully";
        response.companies = companies;
        return res.send(response);
    }
    catch (err) {
        // if some error occurred return this
        console.log(err);
        response.success = false;
        response.message = "An error occured";
        return res.send(response);
    }
}

module.exports = {
    registerForCompany,
    getRegisteredCompanies
}