const adminModel = require("../../models/Student");
const jwt = require("jsonwebtoken");

const authStudent = (req,res,next)=>{
    const token = req.header('Authorization');
    console.log(token);
    if(!token){
        return res.send("A token is required for authorisation");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        console.log(req.user);
        next_function(req,res);
    } catch (err) {
        console.log(err)
        return res.status(401).send("Invalid Token");
    }
}

const next_function = (req,res)=>{
    // console.log(req.user);
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // console.log(req.body,reg_no,password);
    adminModel.findOne({reg_no,password},(err,user)=>{
        if(err || !user){
            console.log("Please login first");
            res.send("User not logged in");
        }
        else{
            res.send(user);
        }
    })
}

module.exports = {
    authStudent
}