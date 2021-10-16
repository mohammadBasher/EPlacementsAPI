const mongoose = require("mongoose");
const adminModel = require("../models/Admin");
const jwt = require("jsonwebtoken");

const loginAdmin = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    // console.log(req.body,email,password);
    adminModel.findOne({email,password},(err,user)=>{
        if(err || !user){
            console.log("Please register first");
            res.send("User not registered");
        }
        else{
            //creating token
            const name = user.name;
            const token = jwt.sign(
                { name , email},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "100h",
                }
              );
        
              // save user token
            user.token = token;
            adminModel.findOneAndUpdate({email},user);
            res.send(user);
        }
    })
}

module.exports = {
    loginAdmin
}