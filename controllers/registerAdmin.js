const adminModel = require("../models/Admin")
const fs = require("fs");
const path = require("path")
const jwt = require("jsonwebtoken")

const registerAdmin = (req,res,next)=>{
    const admin = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        //reading uploaded photo
        photo: {
            data: fs.readFileSync(path.join(__dirname +"/../"+ './public/' + req.file.filename)),
            contentType: 'image/png'
        }
    }
    console.log(admin);
    const newAdmin = new adminModel(admin);
    // Create token
    const email = req.body.email;
    const name = req.body.name;
    const token = jwt.sign(
        { name , email},
        process.env.TOKEN_KEY,
        {
        expiresIn: "2h",
        }
    );
    // save user token
    newAdmin.token = token;
    
    newAdmin.save((err,user)=>{
        if(err){
            console.log("some error occurred");
            console.log(err);
            res.send("some error occurred");
        }
        else{

            console.log(user);
            res.send(user);
        }
    })
}

module.exports = {
    registerAdmin
}