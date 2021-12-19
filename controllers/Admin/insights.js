
// This file contains functions for 
// getInsights - which return no. of placedStudents, no. of companies visited, no. of registrations, no. of verified students

const companyModel = require('../../models/Company');
const studentModel = require('../../models/Student');
const registerationModel = require('../../models/Registration');

const getInsights = async (req,res,next) => {
    const response = {};
    try{
        response.registrations = await registerationModel.find({}).count();
        response.placedStudents = await studentModel.find({status:"placed"}).count();
        response.verfiedStudents = await studentModel.find({status:"verified"}).count();
        response.companiesVisited = await companyModel.find({}).count();
        response.success = true;
        response.message = "Data fetched successfully";
        res.send(response);
    }catch(err){
        response.success = false;
        response.message = "Some error occurred while fetching";
        console.log(err);
    }
}


module.exports = {
    getInsights
}
