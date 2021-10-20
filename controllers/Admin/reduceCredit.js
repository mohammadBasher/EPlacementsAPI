const studentModel = require("../../models/Student");

const reduceCredit = (req,res,next)=>{
    const reg_no = req.body.reg_no;
    const credit = req.body.credit;
    const response = {};
    studentModel.findOne({reg_no},{resume:0,photo:0},(err,user)=>{
        if(err || !user){
            response.success = false;
            response.message = "Some error occurred while fetching student";
            console.log(err);
            return res.send(response);
        }
        const updatedStudent = user;
        updatedStudent.credits = updatedStudent.credits - credit;
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
                return res.send(response);
            }
        });
    })
}

module.exports = {
    reduceCredit
}