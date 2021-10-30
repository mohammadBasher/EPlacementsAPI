const adminModel = require('../models/Admin');
const studentModel = require('../models/Student');
const jwt = require("jsonwebtoken");

const getUser = (req, res, next) => {
    const token = req.header('Authorization');
    const response = {};
    // Checking wheather token exists or not
    if (!token) {
        console.log("Inavalid token");
        response.success = false;
        response.message = "Invalid token, login again";
        return res.send(response);
    }
    try {
        // decoding and verifying token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        // if email is not in token, user is a student
        if (!req.user.email) {
            // fetching reg_no and password for request's body
            const reg_no = req.user.reg_no;
            const password = req.user.password;
            // search for the student with that reg_no
            studentModel.findOne({ reg_no }, (err, user) => {
                // return if some error occurs or user is not found
                if (err || !user) {
                    console.log("User not registered");
                    response.success = false;
                    response.message = "User not registered";
                    res.send(response);
                }
                // matching token's password with student's password
                else if (password != user.password) {
                    console.log("Incorrect password");
                    response.success = false;
                    response.message = "Incorrect password, login again";
                    res.send(response);
                }
                else {
                    response.success = true;
                    response.message = "Student found";
                    response.user = user;
                    // returning founded student with the response
                    res.send(response);
                }
            })
        }
        // if email is in token, user is an admin
        else {
            const email = req.user.email;
            const password = req.user.password;
            // searching admin with the fetched email
            adminModel.findOne({ email }, (err, user) => {
                if (err || !user) {
                    // return if some error occurs or user not found
                    console.log("User not registered");
                    response.success = false;
                    response.message = "User not registered";
                    res.send(response);
                }
                // checking stored password with the password in the token
                else if (password != user.password) {
                    console.log("Incorrect password");
                    response.success = false;
                    response.message = "Incorrect password, login again";
                    res.send(response);
                }
                else {
                    response.success = true;
                    response.message = "Admin found";
                    response.user = user;
                    // returning found admin details with the response
                    res.send(response);
                }
            })
        }
    } catch (err) {
        // if any error occurred return that in the response
        console.log(err)
        response.success = false;
        response.message = "Some error occurred while verifying token";
        return res.status(401).send(response);
    }
}

module.exports = {
    getUser
}