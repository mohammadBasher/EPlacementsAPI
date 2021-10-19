const registerationModel = require("../../models/Registration");
const studentModel = require("../../models/Student");

const registerForCompany = (req,res,next)=>{
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // storing incoming information or information user want to update
    const data = req.body;
    studentModel.findOne({reg_no},(err,student)=>{
        if(err || !student){
            // If student is not found or some error occurred return 
            response.success = false;
            response.message = "Some error occurred while finding reg_no";
            return res.send(response);
        }
        else if(password!=student.password){
            // If password doesn't match return with Invalid Password
            response.success = false;
            response.message = "Invalid Password";
            return res.send(response);
        }
        else{
            const registration = data;
            registration.reg_no = reg_no;
            const newRegistration = new registerationModel(registration);
            newRegistration.save((err,registration)=>{
                if(err){
                    console.log(err);
                    response.success = false;
                    response.message = "Some error occurred";
                    return res.send(response);
                }
                else{
                    response.success = true;
                    response.message = "Registration completed";
                    response.registration = registration;
                    return res.send(response);
                }
            })
        }
    })
}

module.exports = {
    registerForCompany
}