// This middleware is to authenticate the admin

const adminModel = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authAdmin = (req,res,next)=>{
    const token = req.header('Authorization');
    // console.log(token);
    const response = {};
    // Checking wheather token exists or not
    if(!token){
        response.success = false;
        response.message = "A token is required for authorisation";
        return res.send(response);
    }
    try {
        // decoding and verifying token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        // console.log(req.user);
        if(!req.user.email || !req.user.password){
            response.success = false;
            response.message = "Token is invalid";
            return res.send(response);
        }
        const email = req.user.email;
        const password = req.user.password;
        console.log(email,password);
        adminModel.findOne({email},(err,user)=>{
            // console.log(user);
            if(err || !user ){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            console.log(password==user.password);
            console.log(user.password);
            if(password!=user.password){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            // calling next function to complete further process
            next();
        })
    } catch (err) {
        response.success = false;
        response.message = "Some error occurred while verifying token";        
        console.log(err)
        return res.status(401).send(response);
    }
}

module.exports = {
    authAdmin
}