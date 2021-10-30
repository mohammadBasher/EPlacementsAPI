const mongoose = require("mongoose");
const studentModel = require("../../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const loginStudent = (req, res, next) => {
    // fetching reg_no and password from request's body
    const reg_no = req.body.reg_no;
    var password = req.body.password;
    const response = {};
    // checking if any of the field is empty
    if (!req.body.reg_no || !req.body.password) {
        console.log("Empty fields");
        response.success = false;
        response.message = "Registration no. and password are required";
        return res.send(response);
    }
    // searching student with the given reg_no
    studentModel.findOne({ reg_no }, { photo: 0, resume: 0 }, (err, user) => {
        // if some error occurred or student not found return from here
        if (err || !user) {
            console.log("Student not registered");
            response.success = false;
            response.message = "Student not registered";
            res.send(response);
        }
        // Now compare the password with the saved password
        else if (!bcrypt.compareSync(password, user.password)) {
            console.log("Incorrect password");
            response.success = false;
            response.message = "Incorrect password, try again";
            res.send(response);
        }
        else {
            // return if password is also matched create token using jwt
            password = user.password;
            const token = jwt.sign({ password, reg_no }, process.env.TOKEN_KEY, { expiresIn: "100000h" });
            response.success = true;
            response.message = "Student logged in successfully";
            response.user = user;
            response.token = token;
            res.send(response);
        }
    })
}

module.exports = {
    loginStudent
}