const adminModel = require("../../models/Student");
const jwt = require("jsonwebtoken");

const authStudent = (req,res,next)=>{
    const token = req.header('Authorization');
    console.log(token);
    const response = {};
    if(!token){
        response.success = "false";
        response.message = "User is not logged in or token not exist";
        return res.send(response);
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        console.log(req.user);
        next_function(req,res);
    } catch (err) {
        console.log(err)
        response.success = "false";
        response.message = "Some error occurred while verifying token";
        return res.status(401).send(response);
    }
}

const next_function = (req,res)=>{
    // console.log(req.user);
    const response = {};
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // console.log(req.body,reg_no,password);
    adminModel.findOne({reg_no,password},(err,user)=>{
        if(err || !user){
            response.success = "false";
            response.message = "User is not logged in";
            console.log("Please login first");
            res.send(response);
        }
        else{
            response.success = "true";
            response.message = "token verified";
            response.user = user;
            res.send(response);
        }
    })
}

module.exports = {
    authStudent
}