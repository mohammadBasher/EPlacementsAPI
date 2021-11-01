const studentModel = require("../../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const changePassword = (req, res, next) => {
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // if cPassword field doesn't match with the current password
    // return from here
    if(req.body.cPassword!=password){
        response.status = false;
        response.message = "Please enter the current password correctly";
        return res.send(response);
    }
    studentModel.findOne({ reg_no }, (err, student) => {
        if (err || !student) {
            // If student is not found or some error occurred 
            console.log("Student not found");
            response.success = false;
            response.message = "An error occured, try again";
            return res.send(response);
        }
        else if (password != student.password) {
            // If password doesn't match
            console.log("Invalid password");
            response.success = false;
            response.message = "Incorrect password";
            return res.send(response);
        }
        else {
            // hash the new password and create
            student.password = bcrypt.hashSync(req.body.password, 5);
            const newPassword = student.password;
            const token = jwt.sign({ newPassword, reg_no }, process.env.TOKEN_KEY, { expiresIn: "100000h" });
            // Updating details in the database
            const updateStudent = student;
            studentModel.findByIdAndUpdate(student._id, updateStudent, (err, student) => {
                if (err) {
                    console.log(err);
                }
            });
            // returning updated student and token with the response
            response.success = true;
            response.message = "Password changed successfully";
            response.user = student;
            response.token = token;
            return res.send(response);
        }
    })
}

module.exports = {
    changePassword
}