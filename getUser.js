const adminModel = require('./models/Admin');
const studentModel = require('./models/Student');
const jwt = require("jsonwebtoken");

const getUser = (req,res,next)=>{
    const token = req.header('Authorization');
    // console.log(token);
    const response = {};
    // Checking wheather token exists or not
    if(!token){
        response.success = false;
        response.message = "User is not logged in!! Please log in first";
        return res.send(response);
    }
    try {
        // decoding and verifying token
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        // console.log(req.user);
        if(!req.user.email){
            const reg_no = req.user.reg_no;
            const password = req.user.password;
            studentModel.findOne({reg_no},(err,user)=>{
                // console.log(reg_no);
                // console.log(user);
                if(err || !user){
                    response.success = false;
                    response.message = "User is not registered";
                    console.log("Please register first");
                    res.send(response);
                }
                else if(password!=user.password){
                    response.success = false;
                    response.message = "Incorrect Password";
                    res.send(response);
                }
                else{
                    response.success = true;
                    response.message = "Logged in student found!";
                    response.user = user;
                    // returning registered user with token to be save for future use
                    res.send(response);
                }
            })        
        }
        else{
            const email = req.user.email;
            const password = req.user.password;
            adminModel.findOne({email},(err,user)=>{
                if(err || !user){
                    response.success = false;
                    response.message = "User is not registered";
                    console.log("Please register first");
                    res.send(response);
                }
                else if(password!=user.password){
                    response.success = false;
                    response.message = "Incorrect Password";
                    res.send(response);
                }
                else{
                    response.success = true;
                    response.message = "Logged in admin found!";
                    response.user = user;
                    // returning registered user with token to be save for future use
                    res.send(response);
                }
            })
        }
    } catch (err) {
        response.success = false;
        response.message = "Some error occurred while verifying token";        
        console.log(err)
        return res.status(401).send(response);
    }
}

module.exports = {
    getUser
}