// This middleware is to authenticate the user

const studentModel = require("../models/Student");
const jwt = require("jsonwebtoken");

const authStudent = (req,res,next)=>{
    const token = req.header('Authorization');
    // console.log(token);
    const response = {};
    if(!token){
        response.success = false;
        response.message = "User is not logged in or token not exist";
        return res.send(response);
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        // console.log(req.user);
        if(!req.user.reg_no || !req.user.password){
            response.success = false;
            response.message = "Token is invalid";
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