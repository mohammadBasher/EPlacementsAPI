const mongoose = require("mongoose");
const studentModel = require("../../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const loginStudent = (req,res,next)=>{
    // fetching reg_no and password from request's body
    const reg_no = req.body.reg_no;
    var password = req.body.password;
    const response = {};
    // checking if any of the field is empty
    if(!req.body.reg_no || !req.body.password){
        response.success = false;
        response.message = "Registration no. and password are required";
        return res.send(response);
    }
    // searching student with the given reg_no
    studentModel.findOne({reg_no},{photo:0,resume:0},(err,user)=>{
        // if some error occurred or student not found return from here
        if(err || !user){
            response.success = false;
            response.message = "Student not registered";
            console.log("Please register first");
            res.send(response);
        }
        // Now compare the password with the saved password
        else if(!bcrypt.compareSync(password, user.password)){
            response.success = false;
            response.message = "Incorrect password, try again";
            res.send(response);
        }
        else{
            // if password also matched
            // using jwt for
            //creating token
            password = user.password;
            const token = jwt.sign({ password , reg_no},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "100000h",
                }
            );
            // returning student's details with the created token in the response
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