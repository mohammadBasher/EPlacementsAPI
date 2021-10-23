const studentModel = require("../../models/Student");

const getStudents = (req,res,next)=>{
    const response = {};
    // if get_status field is present in the request it return students with that status only
    // i.e. if get_status = "placed" it return only placed students
    // if get_status is not in the request it return all the students
    const status = req.body.get_status;
    if(!status){
        query = {};
    }
    else{
        query = {status:status};        
    }
    // searching students collection with the formed query
    studentModel.find(query,{name:1,reg_no:1,branch:1,course:1,status:1},(err,users)=>{
        // if some error occurred return from here
        if(err){
            response.success = false;
            response.message = "Some error occurred while fetching students";
            console.log(err);
            return res.send(response);
        }
        // Return fetched students with the response
        response.success = true;
        response.message = "Students fetched successfully";
        response.students = users;
        return res.send(response);
    });
}

const setStatus = (req,res,next)=>{
    // it require student reg_no whose status needed to be changed 
    // and a set_status field to which the status needed to be changed
    const response = {};
    const reg_no = req.body.reg_no;
    const newStatus = req.body.set_status;
    const remark = req.body.remark;
    // updating the status in the collection
    studentModel.findOneAndUpdate({reg_no},{status:newStatus,remarks:remark},(err,user)=>{
        // if some error occurred return from here
        if(err){
            response.success = false;
            response.message = "Some error occurred while updating";
            console.log(err);
            return res.send(response);
        }
        // else return the updated students with the response
        response.success = true;
        response.message = "Updated Successfully!!";
        return res.send(response);
    })
}

module.exports = {
    getStudents,
    setStatus
}