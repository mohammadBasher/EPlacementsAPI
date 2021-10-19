const adminModel = require("../../models/Admin")
const fs = require("fs");
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const registerAdmin = (req,res,next)=>{
    const email = req.body.email;
    const response = {};
    if(!req.body.name || !req.body.email || !req.body.password || !req.file.filename){
        response.success = false;
        response.message = "All fields are required";
        res.send(response);
    }

    adminModel.findOne({email},(err,user)=>{
        console.log("findOne function");
        if(err){
            response.success = false;
            response.message = "An error occured, try again";
            console.log(err);
            return res.send(response);
        }
        if(user){
            response.success = false;
            response.message = "Admin already exists";
            return res.send(response);
        }
        else{
            const admin = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password,5),
                //reading uploaded photo
                photo: {
                    data: fs.readFileSync(path.join(__dirname +"/../../"+ './public/' + req.file.filename)),
                    contentType: 'image/png'
                }
            }
            console.log(admin);
            const newAdmin = new adminModel(admin);
            const password = admin.password;
            newAdmin.save((err,user)=>{
                if(err){
                    response.success = false;
                    response.message = "An error occured, try again";
                    console.log(err);
                    return res.send(response);
                }
                else{
                    //creating token
                    const token = jwt.sign({ password , email},
                        process.env.TOKEN_KEY,
                        {
                        expiresIn: "100000h",
                        }
                    );

                    response.success = true;
                    response.message = "Admin registered successfully";
                    response.user = user;
                    response.token = token;
                    return res.send(response);
                }
            })
        }
    })
}

module.exports = {
    registerAdmin
}