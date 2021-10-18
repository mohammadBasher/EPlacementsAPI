const mongoose = require("mongoose");
const adminModel = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const loginAdmin = (req,res,next)=>{
    const email = req.body.email;
    var password = req.body.password;
    const response = {};
    console.log(req.body,email,password);
    adminModel.findOne({email},(err,user)=>{
        console.log(email);
        console.log(user);
        if(err || !user){
            response.success = "false";
            response.message = "Admin not registered";
            console.log("Please register first");
            res.send(response);
        }
        else if(!bcrypt.compareSync(password, user.password)){
            response.success = "false";
            response.message = "Incorrect Password";
            res.send(response);
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

            response.success = "true";
            response.message = "Logged in successfully";
            response.user = user;
            response.token = token;
              // returning registered user with token to be save for future use
            res.send(response);
        }
    })
}

module.exports = {
    loginAdmin
}