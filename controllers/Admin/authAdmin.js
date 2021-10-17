const adminModel = require("../../models/Admin");
const jwt = require("jsonwebtoken");

const authAdmin = (req,res,next)=>{
    const token = req.header('Authorization');
    console.log(token);
    if(!token){
        return res.send("A token is required for authorisation");
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        console.log(req.user);
        next_function(req,res);
    } catch (err) {
        console.log(err)
        return res.status(401).send("Invalid Token");
    }
}

const next_function = (req,res)=>{
    console.log(req.user);
    const email = req.user.email;
    const password = req.user.password;
    // console.log(req.body,email,password);
    adminModel.findOne({email,password},(err,user)=>{
        if(err || !user){
            console.log("Please login first");
            res.send("User not logged in");
        }
        else{
            res.send(user);
        }
    })
}

module.exports = {
    authAdmin
}