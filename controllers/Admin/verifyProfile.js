const studentModel = require("../../models/Student");

const verifyProfile = (req,res,next)=>{
    const response = {};
    studentModel.find({status:"completed"},{name:1,reg_no:1,branch:1,course:1},(err,users)=>{
        if(err){
            response.status = false;
            response.message = "Some error occurred while fetching students";
            console.log(err);
            return res.send(response);
        }
        response.status = true;
        response.message = "Students with completed profile fetched successfully";
        response.students = users;
        return res.send(response);
    });
}

const markVerified = (req,res,next)=>{
    const response = {};
    const reg_no = req.body.reg_no;
    studentModel.findOneAndUpdate({reg_no},{status:"verified"},(err,user)=>{
        if(err){
            response.success = false;
            response.message = "Some error occurred while updating";
            console.log(err);
            return res.send(response);
        }
        response.success = true;
        response.message = "Updated Successfully!!";
        return res.send(response);
    })
}

module.exports = {
    verifyProfile,
    markVerified
}