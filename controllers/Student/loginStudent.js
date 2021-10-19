const mongoose = require("mongoose");
const studentModel = require("../../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const loginStudent = (req,res,next)=>{
    const reg_no = req.body.reg_no;
    var password = req.body.password;
    const response = {};
    console.log(req.body,reg_no,password);
    if(!req.body.reg_no || !req.body.password){
        response.success = false;
        response.message = "Registration no. and password are required";
        return res.send(response);
    }
    studentModel.findOne({reg_no},(err,user)=>{
        // console.log(reg_no);
        // console.log(user);
        if(err || !user){
            response.success = false;
            response.message = "Student not registered";
            console.log("Please register first");
            res.send(response);
        }
        else if(!bcrypt.compareSync(password, user.password)){
            response.success = false;
            response.message = "Incorrect password, try again";
            res.send(response);
        }
        else{
            //creating token
            password = user.password;
            const token = jwt.sign({ password , reg_no},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "100000h",
                }
            );
            
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