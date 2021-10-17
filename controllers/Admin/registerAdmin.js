const adminModel = require("../../models/Admin")
const fs = require("fs");
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');


const registerAdmin = (req,res,next)=>{

    if(!req.body.name || !req.body.email || !req.body.password || !req.file.filename){
        res.send("Please fill all columns");
    }

    const email = req.body.email;

    adminModel.findOne({email},(err,user)=>{
        console.log("findOne function");
        if(err){
            console.log(err);
        }
        if(user){
            return res.send("User already exists");
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
            // Create token
            const password = admin.password;
            
            newAdmin.save((err,user)=>{
                console.log("save function");
                if(err){
                    console.log("some error occurred");
                    console.log(err);
                    return res.send("some error occurred");
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
        
                    // console.log(user);
                    // console.log(user.token);
        
                    // returning registered user with token to be save for future use
                    return res.send({user,token});
                }
            })
        }
    })
}

module.exports = {
    registerAdmin
}