const mongoose = require("mongoose");
const adminModel = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const loginAdmin = (req,res,next)=>{
    const email = req.body.email;
    var password = req.body.password;
    // console.log(req.body,email,password);
    adminModel.findOne({email},(err,user)=>{
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