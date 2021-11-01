const studentModel = require("../../../models/Student");
const fs = require("fs");
const path = require("path");

const updateResume = (req, res, next) => {
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    studentModel.findOne({ reg_no }, (err, student) => {
        if (err || !student) {
            // If student is not found or some error occurred return
            console.log("Reg. No. not found");
            response.success = false;
            response.message = "An error occurred while finding the student";
            return res.send(response);
        }
        else if (password != student.password) {
            // If password doesn't match, return with Invalid Password
            console.log("Invalid password");
            response.success = false;
            response.message = "Invalid Password";
            return res.send(response);
        }
        else {
            // If resumeURL is not valid
            if(req.body.resumeURL == null || req.body.resumeURL == "") {
                console.log("Invalid resume URL");
                response.success = true;
                response.message = "Invalid resume URL";
                return res.send(response);
            }
            // updating resume in the found student
            student.resume = req.body.resumeURL;
            // initialise a updateStudent to store updated details
            const updateStudent = student;
            // Update details in the database
            studentModel.findByIdAndUpdate(student._id, updateStudent, (err, student) => {
                if (err) {
                    console.log(err);
                    response.success = false;
                    response.message = "An error occurred";
                    return res.send(response);
                }
                else {
                    response.success = true;
                    response.message = "Resume updated successfully";
                    return res.send(response);
                }
            });
        }
    })
}

module.exports = {
    updateResume
}