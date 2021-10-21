const mongoose = require("mongoose");
const adminModel = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const loginAdmin = (req,res,next)=>{
    // fetching email and password from request's body
    const email = req.body.email;
    var password = req.body.password;
    const response = {};
    // checking if any of the field is empty
    if(!req.body.email || !req.body.password){
        response.success = false;
        response.message = "Email no. and password are required";
        return res.send(response);
    }
    // console.log(req.body,email,password);
    // Checking wheather any account registered with that email
    adminModel.findOne({email},{photo:0},(err,user)=>{
        // if some error occurred or user not found
        // return response with success false
        if(err || !user){
            response.success = false;
            response.message = "Admin not registered";
            console.log("Please register first");
            return res.send(response);
        }
        // Now compare password using bcrypt as saved password is hashed
        // if password doesn't match return from here
        else if(!bcrypt.compareSync(password, user.password)){
            response.success = false;
            response.message = "Incorrect Password";
            return res.send(response);
        }
        else{
            // Now as account is found and password also matched
            // using jwt for
            //creating token
            password = user.password;
            const token = jwt.sign({ password , email},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "10000h",
                }
            );
            // returning found user and created token with the response
            response.success = true;
            response.message = "Logged in successfully";
            response.user = user;
            response.token = token;
            return res.send(response);
        }
    })
}

module.exports = {
    loginAdmin
}