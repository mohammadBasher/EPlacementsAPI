// This middleware is to authenticate the user

const studentModel = require("../models/Student");
const jwt = require("jsonwebtoken");

const authStudent = (req,res,next)=>{
    const token = req.header('Authorization');
    const response = {};
    if(!token){
        response.success = false;
        response.message = "Token required for authorisation";
        return res.send(response);
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        if(!req.user.reg_no || !req.user.password){
            response.success = false;
            response.message = "Invalid token";
            return res.send(response);
        }
        const reg_no = req.user.reg_no;
        const password = req.user.password;
        console.log(reg_no,password);
        studentModel.findOne({reg_no},(err,user)=>{
            // console.log(user);
            if(err || !user ){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            if(password!=user.password){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            next();
        })
    } catch (err) {
        console.log(err)
        response.success = false;
        response.message = "Some error occurred while verifying token";
        return res.status(401).send(response);
    }
}

module.exports = {
    authStudent
}