// This file contains functions for 
// getInsights - which return no. of placedStudents, no. of companies visited, no. of registrations, no. of verified students

const companyModel = require('../../models/Company');
const studentModel = require('../../models/Student');
const registerationModel = require('../../models/Registration');

const getInsights = async (req,res,next) => {
    // declaring response object
    const response = {};
    try{
        // calculating total number of registrations
        response.registrations = await registerationModel.find({}).count();
        // calculating number of placed students
        response.placedStudents = await studentModel.find({status:"placed"}).count();
        // calculating number of verified students
        response.verfiedStudents = await studentModel.find({status:"verified"}).count();
        response.verfiedStudents += response.placedStudents;
        // calculating number of companies visited
        response.companiesVisited = await companyModel.find({}).count();
        response.success = true;                            // marks success as true
        response.message = "Data fetched successfully";     // add message with the response
        res.send(response);
    }catch(err){
        // if some error occured 
        // marks success as false
        response.success = false;
        // return error message
        response.message = "Some error occurred while fetching";
        console.log(err);
    }
}

module.exports = {
    getInsights
}
