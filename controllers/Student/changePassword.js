const studentModel = require("../../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const changePassword = (req,res,next)=>{
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    studentModel.findOne({reg_no},(err,student)=>{
        if(err || !student){
            // If student is not found or some error occurred return 
            response.success = false;
            response.message = "Some error occurred while finding reg_no";
            return res.send(response);
        }
        else if(password!=student.password){
            // If password doesn't match, return with Invalid Password
            response.success = false;
            response.message = "Invalid Password Please try after login again";
            return res.send(response);
        }
        else{
            // Using data indexes as keys to update only incoming fields in student
            student.password = bcrypt.hashSync(req.body.password,5);
            const newPassword = student.password;
            const token = jwt.sign(
                { newPassword , reg_no},
                process.env.TOKEN_KEY,
                {
                expiresIn: "100000h",
                }
            );
            // initialise a updateStudent to store updated details
            const updateStudent = student;
            // Update details in the database
            // console.log("---------------------------------");
            // console.log(updateStudent);
            studentModel.findByIdAndUpdate(student._id,updateStudent,(err,student)=>{
                if(err){
                    console.log(err);
                }
            });
            response.success = true;
            response.message = "Password changed";
            response.user = student;
            response.token = token;
            return res.send(response);
        }
    })
}

module.exports = {
    changePassword
}