const studentModel = require("../../models/Student");

const studentPlaced = (req,res,next)=>{
    const response = {};
    const reg_no = req.body.reg_no;
    studentModel.findOneAndUpdate({reg_no},{status:"placed"},(err,user)=>{
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
    studentPlaced
}