// This file contains functions for 
// getGrievance - to get the grievance accorrding to their status
// resolveGrievance - to change the status of a grievance

const grievanceModel = require("../../models/Grievance");

const getGrievance = (req, res, next) => {
    const response = {}
    // fetching all saved grievances
    const status = req.body.status;
    // toSearch will be passed to find function with status if available
    const toSearch = {};
    // if status found in request add it to toSearch
    if(status=="resolved" || status=="unresolved"){
        toSearch.status = status;
    }
    // else pass empty toSearch object to fetch all the grievances
    grievanceModel.find(toSearch,(err,grievance)=>{
        // if some error occurred return from here
        if(err){
            console.log("Some error occurred while fetching grievances");
            response.success = false;
            response.message = "Some error occurred while fetching grievances";
            return res.send(response);
        }
        // return the fetched grievances in response.grievances
        response.success = true;
        response.message = "Grievances fetched successfully";
        response.grievances = grievance;
        return res.send(response);
    })
}

const resolveGrievance = (req, res, next) => {
    const id = req.body.id;             // fetching id from request's body
    const status = req.body.status;     // getting status to set from request's body
    const response = {}
    // finding grievance with id 
    grievanceModel.findOne({_id:id},(err,grievance)=>{
        // if some error occurred return from here
        if(err){
            console.log("Some error occurred while finding grievance");
            response.success = false;
            response.message = "Some error occurred while finding grievance";
            return res.send(response);
        }
        // updated the grievance status
        grievance.status = status;
        const newGrievance = new grievanceModel(grievance);
        // saving updated grievance
        newGrievance.save((err,grievance)=>{
            // if some error occurred return from here
            if(err){
                response.success = false;
                response.message = "Some error occurred while updating status";
                return res.send(response);
            }
            // return response as success = true
            response.success = true;
            response.message = "Grievance status updated successfully";
            return res.send(response);
        })
    })
}


module.exports = {
    getGrievance,
    resolveGrievance
}