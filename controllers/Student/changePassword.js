const studentModel = require("../../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const changePassword = (req, res, next) => {
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // getting current password and new password from user
    const current_password = req.body.current_password;
    const new_password = req.body.new_password;
    // if current password and new password are same
    if (current_password == new_password) {
        console.log("Same current and new password");
        response.success = false;
        response.message = "Same current and new password";
        return res.send(response);
    }
    // if current password is not correct
    if (!bcrypt.compareSync(current_password, password)) {
        console.log("Invalid password");
        response.success = false;
        response.message = "Incorrect password";
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
            // hash the new password and create new jwt token
            const newHash = bcrypt.hashSync(new_password, 5)
            student.password = newHash;
            const token = jwt.sign({ newHash, reg_no }, process.env.TOKEN_KEY, { expiresIn: "100000h" });
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
            response.token = token;
            return res.send(response);
        }
    })
}

module.exports = {
    changePassword
}