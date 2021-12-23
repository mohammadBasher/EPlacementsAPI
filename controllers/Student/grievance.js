// This file contains functions for 
// addGrievance - to add a Grievance

const grievanceModel = require("../../models/Grievance");
const studentModel = require("../../models/Student");

const addGrievance = (req, res, next) => {
    // fetching grievance from request's body
    const grievance = req.body;
    // fetching student's reg_no from decoded user details stored in req.user on the time of authentication
    const reg_no = req.user.reg_no;
    const response = {}
    // if req.user is empty then use in not authenticated
    if (!req.user) {
        console.log("User is not logged in");
        response.success = false;
        response.message = "User is not logged in";
        return res.send(response);
    }
    // searching student with reg_no to get remaining details
    studentModel.findOne({ reg_no }, (err, user) => {
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "Some error occurred while fetching the student's details";
            return reponse.send(response);
        }
        // adding further details in the grievance object
        grievance.reg_no = user.reg_no;             // adding reg_no
        grievance.name = user.name;                 // adding name
        grievance.email = user.email;               // adding email
        grievance.timestamp = new Date().getTime(); // adding current timestamp
        grievance.status = "unresolved";            // set status as unresolved
        // saving the grievance
        const newGrievance = new grievanceModel(grievance);
        newGrievance.save((err, grievance) => {
            // if some error occurred return
            // with success as false;
            if (err) {
                console.log(err);
                response.success = false;
                response.message = "Some error occurred while saving the grievance";
                return res.send(response);
            }
            // else return response as success = true;
            console.log("Grievance Saved successfully");
            response.success = true;
            response.message = "Grievance saved successfully";
            return res.send(response);
        })
    })
}

module.exports = {
    addGrievance
}