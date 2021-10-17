const mongoose = require("mongoose");
const studentModel = require("../../models/Student");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const loginStudent = (req,res,next)=>{
    const reg_no = req.body.reg_no;
    var password = req.body.password;
    console.log(req.body,reg_no,password);
    studentModel.findOne({reg_no},(err,user)=>{
        console.log(reg_no);
        console.log(user);
        if(err || !user){
            console.log("Please register first");
            res.send("User not registered");
        }
        else if(!bcrypt.compareSync(password, user.password)){
            res.send("Incorrect Password");
        }
        else{
            //creating token
            password = user.password;
            const token = jwt.sign(
                { password , reg_no},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "100h",
                }
              );
        
              // returning registered user with token to be save for future use
            res.send({user,token});
        }
    })
}

module.exports = {
    loginStudent
}