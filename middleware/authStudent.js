// This middleware is to authenticate the user

const studentModel = require("../models/Student");
const jwt = require("jsonwebtoken");

const authStudent = (req,res,next)=>{
    // fetching token from request's header
    const token = req.header('Authorization');
    const response = {};
    if(!token){
        // if token is not found return ...
        response.success = false;
        response.message = "Token required for authorisation";
        return res.send(response);
    }
    try {
        // decoding and verifying token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // storing decoded details in req.user
        req.user = decoded;
        // checking wheather a token is valid or not
        if(!req.user.reg_no || !req.user.password){
            response.success = false;
            response.message = "Invalid token";
            return res.send(response);
        }
        // fetching reg_no and password from req.user
        const reg_no = req.user.reg_no;
        const password = req.user.password;
        // searching student with the given reg_no in student's collection
        studentModel.findOne({reg_no},(err,user)=>{
            // if some error occurred or student is not found 
            // return from here...
            if(err || !user ){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            // matching password with the password in the database
            if(password!=user.password){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            // calling next for furthur proccessing
            next();
        })
    } catch (err) {
        // if some error occurred 
        // catch that and return from here...
        console.log(err)
        response.success = false;
        response.message = "Some error occurred while verifying token";
        return res.status(401).send(response);
    }
}

module.exports = {
    authStudent
}