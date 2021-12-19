// Middleware to authenticate the student

const studentModel = require("../models/Student");
const jwt = require("jsonwebtoken");

const authStudent = (req, res, next) => {
    // fetching token from request's header
    const token = req.header('Authorization');
    const response = {};
    if (!token) {
        // return if token is not found
        console.log("Token required");
        response.success = false;
        response.message = "Token required for authorization";
        return res.send(response);
    }
    try {
        // decoding and verifying token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // storing decoded token in req.user
        req.user = decoded;
        // checking whether the token is valid or not
        if (!req.user.reg_no || !req.user.password) {
            console.log("Invalid token");
            response.success = false;
            response.message = "Invalid token";
            return res.send(response);
        }
        // fetching reg_no and password from token
        const reg_no = req.user.reg_no;
        const password = req.user.password;
        // searching for student with that reg_no in the database
        studentModel.findOne({ reg_no }, (err, user) => {
            // return if some error is occurred or student is not found
            if (err || !user) {
                console.log("Invalid token");
                response.success = false;
                response.message = "Invalid token";
                return res.send(response);
            }
            // match user password with the password in the database
            if (password != user.password) {
                console.log("Invalid token");
                response.success = false;
                response.message = "Invalid token";
                return res.send(response);
            }
            // calling next function to complete further process
            console.log("Student is authenticated");
            next();
        })
    } catch (err) {
        // return if some error is occurred
        console.log(err)
        response.success = false;
        response.message = "An error occurred while verifying token";
        return res.status(401).send(response);
    }
}

module.exports = {
    authStudent
}