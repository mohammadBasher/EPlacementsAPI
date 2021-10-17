const studentModel = require("../../models/Student")
// For using jwt tokens
const jwt = require("jsonwebtoken")
// For hashing password
const bcrypt = require('bcrypt');


const registerStudent = (req,res,next)=>{
    // Checking if any of the field is empty
    if(!req.body.reg_no || !req.body.password){
        res.send("Please fill all columns");
    }

    const reg_no = req.body.reg_no;
    // Checking wheather Student with reg_no already registered
    studentModel.findOne({reg_no},(err,user)=>{
        console.log("findOne function");
        if(err){
            console.log(err);
            res.send("Some error occurred");
        }
        if(user){
            // if student exist send response
            return res.send("User already exists");
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
                    console.log("some error occurred");
                    console.log(err);
                    return res.send("some error occurred");
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
        
                    // returning registered user with token to be save for future use
                    return res.send({user,token});
                }
            })
        }
    })
}

module.exports = {
    registerStudent
}