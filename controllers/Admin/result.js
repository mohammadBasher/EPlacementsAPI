const companyModel = require("../../models/Company");
const registrationModel = require("../../models/Registration");
const studentModel = require('../../models/Student');

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

const loadCompanies = async (req,res,next) => {
    // initialising response object
    const response = {}
    try{
        // fetch companies whose status is not equal to result announced
        const companies = await companyModel.find({status : { $ne: "result announced" } },{name:1});
        response.success = true;
        response.message = "Companies loaded successfully";
        // return the companies with the response
        response.companies = companies;
        return res.send(response);
    }catch(err){
        // if some error occurred return success as false
        console.log(err);
        response.success = false;
        response.message = "Some error occurred";
        return res.send(response);
    }
}

const loadStudents = async (req,res,next)=>{
    const response = {}
    // fetch company_id from request's body
    const company_id = req.body.company_id;
    try{
        // search registrationModel for students registered for that company
        const students = await registrationModel.find({company_id},{reg_no:1});
        response.success = true;
        response.message = "students fetched successfully";
        // return fetched students registration numbers to announce selected students
        response.students = students;
        return res.send(response);
    }catch(err){
        // if some error occurred return success as false
        console.log(err);
        response.success = false;
        response.message = "Some error occurred";
        return res.send(response);
    }
}

module.exports = {
    addResult,
    loadCompanies,
    loadStudents
}