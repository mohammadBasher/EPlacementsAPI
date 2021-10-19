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
        if(err || !user){
            response.success = false;
            response.message = "Admin not registered";
            console.log("Please register first");
            return res.send(response);
        }
        else if(!bcrypt.compareSync(password, user.password)){
            response.success = false;
            response.message = "Incorrect Password";
            return res.send(response);
        }
        else{
            //creating token
            password = user.password;
            const token = jwt.sign({ password , email},
                process.env.TOKEN_KEY,
                {
                  expiresIn: "10000h",
                }
            );

            response.success = true;
            response.message = "Logged in successfully";
            response.user = user;
            response.token = token;
            return res.send(response);
        }
    })
}

module.exports = {
    loginAdmin
}