// This file contains function for 
// getStudents - to get the details of students with their status
// setStatus - to change the status of a student
// reduceCredit - to reduce credit of a student
// getDetail - to get the details of a student by his reg_no

const studentModel = require("../../models/Student");

// function to get student details
const getStudents = (req, res, next) => {
    const response = {};
    // if get_status field is present in the request it return students with that status only
    // i.e. if get_status = "placed" it return only placed students
    // if get_status is not in the request it return all the students
    const status = req.body.get_status;
    if (!status) {
        query = {};
    }
    else {
        query = { status: status };
    }
    // searching students collection with the formed query
    studentModel.find(query, { name: 1, reg_no: 1, branch: 1, course: 1, status: 1 }, (err, users) => {
        // if some error occurred return from here
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "Some error occurred while fetching students";
            return res.send(response);
        }
        // Return fetched students with the response
        response.success = true;
        response.message = "Students fetched successfully";
        response.students = users;
        return res.send(response);
    });
}

// function to set the student's status
const setStatus = async (req, res, next) => {
    // it require student reg_no whose status needed to be changed 
    // and a set_status field to which the status needed to be changed
    const response = {};
    const reg_no = req.body.reg_no;
    const newStatus = req.body.set_status;
    const remark = req.body.remark;
    const student = await studentModel.findOne({reg_no},{ status: 1 });
    // if the status of the student is placed then return from here
    if(student.status=="placed"){
        response.success = false;
        response.message = "Status of a placed student cann't be changed";
        return res.send(response);
    }
    // updating the status in the collection
    studentModel.findOneAndUpdate({ reg_no }, { status: newStatus, remarks: remark }, (err, user) => {
        // if some error occurred return from here
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "Some error occurred while updating";
            return res.send(response);
        }
        // else return the updated students with the response
        response.success = true;
        response.message = "Updated Successfully!!";
        return res.send(response);
    })
}

const reduceCredit = (req, res, next) => {
    // fetching reg_no and credit to be reduced from request's body
    const reg_no = req.body.reg_no;
    const credit = req.body.credit;
    const response = {};
    // if credits to be reduced is negative or 0 return from here
    if (credit <= 0) {
        response.success = false;
        response.message = "Number of credits reduced must be greater than 0";
        return res.send(response);
    }
    // Now fetch student's credit with that reg_no
    studentModel.findOne({ reg_no }, { credits: 1 }, (err, user) => {
        // if some error occurred or student not found
        // return from here
        if (err || !user) {
            console.log(err);
            response.success = false;
            response.message = "Some error occurred while fetching student";
            return res.send(response);
        }
        // reduce credits of that student
        const updatedStudent = user;
        updatedStudent.credits = updatedStudent.credits - credit;
        // if credits of student after reduction becomes negative return from here
        if (updatedStudent.credits < 0) {
            response.success = false;
            response.message = "Credits becoming negative after reduction";
            return res.send(response);
        }
        // Now if everything found to be OK
        // update student's credits in DB
        studentModel.findOneAndUpdate({ reg_no }, updatedStudent, (err, user) => {
            // if some error occurred while saving
            if (err) {
                console.log(err);
                response.success = false;
                response.message = "Some error occurred while updating";
                return res.send(response);
            }
            // finally return response with final credits
            else {
                response.success = true;
                response.message = "Credits reduced successfully";
                response.final_credits = updatedStudent.credits;
                return res.send(response);
            }
        });
    })
}

const getDetail = (req,res,next) => {
    // fetching student's reg_no from the request
    const reg_no = req.body.reg_no;
    // creating response object
    const response = {}
    // searching student with that reg_no
    studentModel.findOne({reg_no},(err,student)=>{
        // if some error occcurred return with success as false 
        if(err){
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }
        // else return the fetched student object with the response
        response.success = true;
        response.message = "Student fetched successfully";
        response.student = student;
        return res.send(response);
    })
}

module.exports = {
    getStudents,
    setStatus,
    reduceCredit,
    getDetail
}