const studentModel = require("../../models/Student");

const reduceCredit = (req,res,next)=>{
    const reg_no = req.body.reg_no;
    const credit = req.body.credit;
    const response = {};
    if(credit<=0){
        response.success = false;
        response.message = "Number of credits reduced must be greater than 0";
        return res.send(response);
    }
    studentModel.findOne({reg_no},{credits:1},(err,user)=>{
        if(err || !user){
            response.success = false;
            response.message = "Some error occurred while fetching student";
            console.log(err);
            return res.send(response);
        }
        const updatedStudent = user;
        updatedStudent.credits = updatedStudent.credits - credit;
        if(updatedStudent.credits<0){
            response.success = false;
            response.message = "Credits becoming negative after reduction";
            return res.send(response);
        }
        studentModel.findOneAndUpdate({reg_no},updatedStudent,(err,user)=>{
            if(err){
                response.success = false;
                response.message = "Some error occurred while updating";
                console.log(err);
                return res.send(response);
            }
            else{
                response.success = true;
                response.message = "Credits reduced successfully";
                response.final_credits = updatedStudent.credits;
                return res.send(response);
            }
        });
    })
}

module.exports = {
    reduceCredit
}