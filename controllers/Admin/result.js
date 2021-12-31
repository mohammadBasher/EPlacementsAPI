// This file contains functions for 
// addResult - to announced result for a company by company_id and reg_no number of selected students
// loadCompanies - to fetch list of companies whose result is not announced yet
// loadStudents - to fetch reg_nos of students registered for a company through company id

const companyModel = require("../../models/Company");
const registrationModel = require("../../models/Registration");
const studentModel = require('../../models/Student');
const noticeModel = require('../../models/Notice');

const { sendNotification } = require('../Admin/Notification');

const addResult = async (req, res, next) => {
    const response = {};
    // fetching reg_nos and company id from request's body
    const reg_nos = req.body.reg_nos;
    const company_id = req.body.company_id;
    var title = "";
    var content = "Dear All, We are pleased to announce the following students got placed in ";
    const placed_students = [];
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
            placed_students.push({name:student.name,reg_no:student.reg_no,branch:student.branch});
            // update his status to placed
            student.status = "placed";
            const company = await companyModel.findOne({ _id: company_id });
            // saving company name in student's object to be helpful while searching students
            student.company_name = company.name;
            const updatedStudent = await studentModel.findOneAndUpdate({ reg_no }, student);
            const updatedRegistration = await registrationModel.findOneAndUpdate({ reg_no }, registration);
        }
        // console.log(placed_students);
        // find company with id
        const company = await companyModel.findOne({ _id: company_id });
        // if not found return from here
        if (!company) {
            response.success = false;
            response.message = "Company is not found with that company id";
            return res.send(response);
        }
        title = company.name;
        title = title + " || Placement Drive";
        content = content + company.name + " :- \n";
        for(var i = 1;i<=placed_students.length;i++){
            content = content + i + ". " + placed_students[i].name + " (" + placed_students[i].reg_no + ") \n";
        }
        console.log(title);
        console.log(content);
        // set the status of company to result announced
        company.status = "result announced";
        const updatedCompany = await companyModel.findOneAndUpdate({ _id: company_id }, company);
        response.success = true;
        response.message = "Results have been added successfully";
        // create and save notice to database
        const timestamp = new Date().getTime();
        const newNotice = new noticeModel({title,content,timestamp});
        const notice = await newNotice.save();
        // sending notification to all the users
        sendNotification(title,content,"allDevices");
        // return success response
        response.notice = notice;
        response.students = placed_students;
        response.company = company;
        return res.send(response);
    } catch (err) {
        console.log(err);
        response.success = false;
        response.message = "Some error occurred";
        return res.send(response);
    }
}

const loadCompanies = async (req, res, next) => {
    // initialising response object
    const response = {}
    try {
        // fetch companies whose status is not equal to result announced
        const companies = await companyModel.find({ status: { $ne: "result announced" } }, { name: 1 });
        response.success = true;
        response.message = "Companies loaded successfully";
        // return the companies with the response
        response.companies = companies;
        return res.send(response);
    } catch (err) {
        // if some error occurred return success as false
        console.log(err);
        response.success = false;
        response.message = "Some error occurred";
        return res.send(response);
    }
}

const loadStudents = async (req, res, next) => {
    const response = {}
    // fetch company_id from request's body
    const company_id = req.body.company_id;
    try {
        // search registrationModel for students registered for that company
        const registration = await registrationModel.find({ company_id }, { reg_no: 1 });
        const student = []
        for (var i = 0; i < registration.length; i++) {
            const temp = await studentModel.findOne({ reg_no: registration[i].reg_no }, { name: 1 });
            registration[i].name = temp.name;
            student.push({ _id: registration[i]._id, reg_no: registration[i].reg_no, name: temp.name });
        }
        response.success = true;
        response.message = "students fetched successfully";
        // return fetched students registration numbers to announce selected students
        response.students = student;
        return res.send(response);
    } catch (err) {
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