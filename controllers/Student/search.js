
// This file contains functions for 
// searchStudents - to get the list of students with status equal verified and placed

const studentModel = require('../../models/Student');

const searchStudent = async (req,res,next)=>{
    // creating response object
    const response = {};
    try{
        // find student whose status is verified or placed
        const students = await studentModel.find({status :{ $in :["placed","verified"]}},{reg_no:1,name:1,status:1,company_name:1});
        response.success = true;
        response.message = "List of students fetched successfully";
        // return list of students with the response
        response.students = students;
        return res.send(response);
    }catch(err){
        // if some error occurred return success as false
        console.log(err);
        response.success = false;
        response.message = "Some error occurred";
        return res.send(response);
    }
}

module.exports = {
    searchStudent
}