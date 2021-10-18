const studentModel = require("../../models/Student")
// For using jwt tokens
const jwt = require("jsonwebtoken")
// For hashing password
const bcrypt = require('bcrypt');


const registerStudent = (req,res,next)=>{
    // Checking if any of the field is empty
    const response = {};
    if(!req.body.reg_no || !req.body.password){
        response.success = "false";
        response.message = "reg_no and password is required";
        return res.send(response);
    }

    const reg_no = req.body.reg_no;
    // Checking wheather Student with reg_no already registered
    studentModel.findOne({reg_no},(err,user)=>{
        // console.log("findOne function");
        if(err){
            response.success = "false";
            response.message = "Some error occurred";
            console.log(err);
            res.send(response);
        }
        if(user){
            // if student exist send response
            response.success = "false";
            response.message = "User already exists";
            return res.send(response);
        }
        else{
            // if student is not found then register a new student
            const student = {
                reg_no: req.body.reg_no,
                password: bcrypt.hashSync(req.body.password,5), // saving password with hashing
                status: "registered", // This is to check current status of the student i.e. registered, verified, locked etc.
                credits: "10" // intially 10 credits will be alloted to every newly registered student
            }
            console.log(student);
            const newStudent = new studentModel(student);
            const password = student.password;
            
            newStudent.save((err,user)=>{
                console.log("save function");
                if(err){
                    response.success = "false";
                    response.message = "Some error occured";
                    console.log(err);
                    return res.send(response);
                }
                else{
        
                    //creating token
                    const token = jwt.sign(
                        { password , reg_no},
                        process.env.TOKEN_KEY,
                        {
                        expiresIn: "100h",
                        }
                    );
        
                    // console.log(user);
                    // console.log(user.token);

                    response.success = "true";
                    response.message = "User registered successfully";
                    response.user = user;
                    response.token = token;
                    // returning registered user with token to be save for future use
                    return res.send(response);
                }
            })
        }
    })
}

module.exports = {
    registerStudent
}