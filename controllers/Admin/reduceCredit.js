const studentModel = require("../../models/Student");

const reduceCredit = (req,res,next)=>{
    // fetching reg_no and credit to be reduced from request's body
    const reg_no = req.body.reg_no;
    const credit = req.body.credit;
    const response = {};
    // if credits to be reduced is negative or 0 return from here
    if(credit<=0){
        response.success = false;
        response.message = "Number of credits reduced must be greater than 0";
        return res.send(response);
    }
    // Now fetch student's credit with that reg_no
    studentModel.findOne({reg_no},{credits:1},(err,user)=>{
        // if some error occurred or student not found
        // return from here
        if(err || !user){
            response.success = false;
            response.message = "Some error occurred while fetching student";
            console.log(err);
            return res.send(response);
        }
        // reduce credits of that student
        const updatedStudent = user;
        updatedStudent.credits = updatedStudent.credits - credit;
        // if credits of student after reduction becomes negative return from here
        if(updatedStudent.credits<0){
            response.success = false;
            response.message = "Credits becoming negative after reduction";
            return res.send(response);
        }
        // Now if everything found to be OK
        // update student's credits in DB
        studentModel.findOneAndUpdate({reg_no},updatedStudent,(err,user)=>{
            // if some error occurred while saving
            if(err){
                response.success = false;
                response.message = "Some error occurred while updating";
                console.log(err);
                return res.send(response);
            }
            // finally return response with final credits
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