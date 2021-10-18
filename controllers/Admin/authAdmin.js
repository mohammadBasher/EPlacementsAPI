const adminModel = require("../../models/Admin");
const jwt = require("jsonwebtoken");

const authAdmin = (req,res,next)=>{
    const token = req.header('Authorization');
    console.log(token);
    const response = {};
    if(!token){
        response.success = "false";
        response.message = "A token is required for authorisation";
        return res.send(response);
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        console.log(req.user);
        next_function(req,res);
    } catch (err) {
        response.success = "false";
        response.message = "Invalid token";        
        console.log(err)
        return res.status(401).send(response);
    }
}

const next_function = (req,res)=>{
    const response = {};
    console.log(req.user);
    const email = req.user.email;
    const password = req.user.password;
    // console.log(req.body,email,password);
    adminModel.findOne({email,password},(err,user)=>{
        if(err || !user){
            response.success = "false";
            response.message = "Please Login First";
            console.log("Please login first");
            res.send(response);
        }
        else{
            response.success = "true";
            response.message = "Token Verified";
            response.user = user;
            res.send(response);
        }
    })
}

module.exports = {
    authAdmin
}