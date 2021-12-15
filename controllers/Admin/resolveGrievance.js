const Grievance = require("../../models/Grievance");
const grievanceModel = require("../../models/Grievance");

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
    resolveGrievance
}