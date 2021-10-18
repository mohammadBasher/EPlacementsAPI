const mongoose = require("mongoose");
const studentModel = require("../../models/Student");
const detailsModel = require("../../models/Details");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const completeProfile = (req,res,next)=>{
    const token = req.header('Authorization');
    const response = {};
    if(!token){
        response.success = "false";
        response.message = "student is not logged in or token not exist";
        return res.send(response);
    }
    else{
        const data = req.body;
        // console.log(data);
        // res.send(data);
        const reg_no = data.reg_no;
        const password = data.password;
        studentModel.findOne({reg_no},(err,student)=>{
            if(err || !student){
                response.success = "false";
                response.message = "Some error occurred while finding reg_no";
                return res.send(response);
            }
            else if(!bcrypt.compareSync(password, student.password)){
                response.success = "false";
                response.message = "Invalid Password";
                return res.send(response);
            }
            else if(student.status=="Profile Completed"){
                response.success = "false";
                response.message = "Your profile is already completed!! If you want to change something please click on update profile";
                return res.send(response);
            }
            else{
                // saving acadmic details of student in details collection
                const newDetails = new detailsModel({
                    student_id:student._id,
                    school_10:data.school_10,
                    board_10:data.board_10,
                    year_10:data.year_10,
                    percent_10:data.percent_10,
                    school_12:data.school_12,
                    board_12:data.board_12,
                    year_12:data.year_12,
                    percent_12:data.percent_12,
                    spi_array:data.spi_array,
                    cpi:data.cpi,
                    backlogs:data.backlogs,
                    project_title:data.project_title,
                    project_desc:data.project_desc,
                    intern_title:data.intern_title,
                    intern_desc:data.intern_desc
                });
                newDetails.save((err,details)=>{
                    if(err){
                        response.success = "false";
                        response.message = "Some error occurred while saving details";
                        console.log(err);
                        return res.send(response);
                    }
                    else{
                        student.name = data.name;
                        student.course = data.course;
                        student.branch = data.branch;
                        student.dob = data.dob;
                        student.email = data.email;
                        student.skype_id = data.skype_id;
                        student.linkedin_id = data.linkedin_id;
                        student.gender = data.gender;
                        student.category = data.category;
                        student.physically_challenged = data.physically_challenged;
                        student.residential_status = data.residential_status;
                        student.guardian = data.guardian;
                        student.present_address = data.present_address;
                        student.permanent_address = data.permanent_address;
                        student.marital_status = data.marital_status;
                        student.state = data.state;
                        student.country = data.country;
                        // uploading resume and photo
                        student.photo = {
                            data: fs.readFileSync(path.join(__dirname +"/../../"+ './public/' + req.files[0].filename)),
                            contentType: 'image/png'
                        }
                        student.resume = {
                            data: fs.readFileSync(path.join(__dirname +"/../../"+ './public/' + req.files[1].filename)),
                            contentType: 'pdf'
                        }
                        student.status = "Profile Completed";
                        student.remarks = data.remarks;
                        student.details_id = details._id;
                        const updatedStudent = student;
                        studentModel.findByIdAndUpdate(student._id,updatedStudent,(err,student)=>{
                            if(err){
                                console.log(err);
                            }
                            console.log(student._id);
                            // console.log(student);
                            response.success = "true";
                            response.message = "Updated Succesfully";
                            response.user = student;
                            res.send(response);
                        });
                    }
                })
            }
        })
    }
}

module.exports = {
    completeProfile
}