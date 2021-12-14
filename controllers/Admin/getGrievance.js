const grievanceModel = require("../../models/Grievance");

const getGrievance = (req, res, next) => {
    const response = {}
    // fetching all saved grievances
    grievanceModel.find({},(err,grievance)=>{
        // if some error occurred return from here
        if(err){
            console.log("Some error occurred while fetching grievances");
            response.status = false;
            response.message = "Some error occurred while fetching grievances";
            return res.send(response);
        }
        // return the fetched grievances in response.grievances
        response.status = true;
        response.message = "Grievances fetched successfully";
        response.grievances = grievance;
        return res.send(response);
    })
}

module.exports = {
    getGrievance
}