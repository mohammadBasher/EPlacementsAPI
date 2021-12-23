
// This files contains functions for
// addExperience = to add an experience by student
// getExperience = to get experience by student reg_no or by company name
// checkEligibility = to check wheather student is not placed or wheather he has already written an experience

const experienceModel = require('../../models/Experience');
const studentModel = require('../../models/Student');
const registrationModel = require('../../models/Registration');
const companyModel = require('../../models/Company');

const addExperience = async (req,res,next) => {
    const response = {}
    // fetching experience from request's body
    const experience = req.body;
    const reg_no = req.user.reg_no;
    // saving current time in timestamp
    experience.timestamp = new Date().getTime();
    // finding if student already return an experience
    const previousExperience = await experienceModel.findOne({reg_no});
    // if an experience found with the reg_no number
    // update that experience
    if(previousExperience){
        const newExperience = await experienceModel.findOneAndUpdate({reg_no},experience,{new:true});
        response.success = true;
        response.message = "Experience updated successfully";
        response.experience = newExperience;
        return res.send(response);
    }
    const newExperience = new experienceModel(experience);
    // saving experience
    newExperience.save((err,experience)=>{
        // if some error occurred while saving return from here
        if(err){
            response.success = false;
            response.msg = "Some error occurred while saving the experience";
            return res.send(response);
        }
        // if experience saved successfully return success = true with saved experience object
        response.success = true;
        response.message = "Experience added successfully";
        response.experience = experience;
        return res.send(response);
    })
}

const getExperience = (req,res,next) => {
    const response = {}
    // fetching all the experiences from experience model
    experienceModel.find({},(err,experience)=>{
        // if some error occurred return from here
        if(err){
            response.success = false;
            response.message = "Some error occurred while fetching experiences";
            return res.send(response);
        }
        // else return all the fetched experiences with the response
        response.success = true;
        response.message = "Experiences fetched successfully";
        response.experience = experience;
        return res.send(response);
    })
}

const checkEligibility = async (req,res,next) => {
    // fetching the reg_no of logged in user
    const response = {}
    const reg_no = req.user.reg_no;
    try{
        const registration = await registrationModel.findOne({reg_no,status:"placed"});
        if(registration){
            // console.log(registration);
            // checking wheather student already written his experience
            const experience = await experienceModel.findOne({reg_no});
            // console.log(experience);
            // if experience found with this reg_no written the already written experience to edit that
            if(experience){
                response.isEligible = false;
                response.success = true;
                response.message = "You have already written the experience";
                response.experience = experience;
                return res.send(response);
            }
            // if experience not found then student is eligible to add experience
            // will return student name and reg_no to be saved with written experience
            // and company id name job_profile and job_location will be returned
            const student = await studentModel.findOne({reg_no},{name:1,reg_no:1});
            const company = await companyModel.findOne({_id:registration.company_id},{name:1,job_profile:1,job_location:1});
            // console.log(registration.company_id);
            response.student = student;
            response.company = company;
            response.isEligible = true;
            response.success = true;
            response.message = "You are eligible to write your experience";
            return res.send(response);
        }
        // else no registration is found with the given credentials
        else{
            response.success = false;
            response.isEligible = false;
            response.message = "You are not eligible to write an experience";
            return res.send(response);
        }
    }catch(err){
        console.log(err);
        response.status = false;
        response.message = "Some error occurred";
        return res.send(response);
    }
    
}

module.exports = {
    addExperience,
    getExperience,
    checkEligibility
}