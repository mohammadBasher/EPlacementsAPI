const mongoose = require("mongoose");
const adminModel = require("../models/Admin");
const jwt = require("jsonwebtoken");

const loginAdmin = (req,res,next)=>{
    const email = req.body.email||req.user.email;
    const password = req.body.password||req.user.password;
    // console.log(req.body,email,password);
    adminModel.findOne({email,password},(err,user)=>{
        if(err || !user){
            console.log("Please register first");
            res.send("User not registered");
        }
        else{
            //creating token
            const token = jwt.sign(
                { password , email},
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
    loginAdmin
}