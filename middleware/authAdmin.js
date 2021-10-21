// This middleware is to authenticate the admin

const adminModel = require("../models/Admin");
const jwt = require("jsonwebtoken");

const authAdmin = (req,res,next)=>{
    // fetch token from request's header
    const token = req.header('Authorization');
    const response = {};
    if(!token){
        // if token not found return from here
        response.success = false;
        response.message = "Token required for authorisation";
        return res.send(response);
    }
    try {
        // decoding and verifying token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        // storing decoded token in req.user 
        req.user = decoded;
        // checking wheather a token is valid or not
        if(!req.user.email || !req.user.password){
            response.success = false;
            response.message = "Invalid token";
            return res.send(response);
        }
        // fetching email and password from token
        const email = req.user.email;
        const password = req.user.password;
        // searching for admin with that email in the database
        adminModel.findOne({email},(err,user)=>{
            // if some error occurred or admin not found 
            // return from here..
            if(err || !user ){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            // matching password with the password in the database
            if(password!=user.password){
                response.success = false;
                response.message = "Token is invalid";
                return res.send(response);
            }
            // calling next function to complete further process
            next();
        })
    } catch (err) {
        // if some error occurred 
        // catch that and return from here...
        response.success = false;
        response.message = "Some error occurred while verifying token";        
        console.log(err)
        return res.status(401).send(response);
    }
}

module.exports = {
    authAdmin
}