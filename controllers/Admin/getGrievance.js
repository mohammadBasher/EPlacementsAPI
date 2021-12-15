const grievanceModel = require("../../models/Grievance");

const getGrievance = (req, res, next) => {
    const response = {}
    // fetching all saved grievances
    const status = req.body.status;
    // toSearch will be passed to find function with status if available
    const toSearch = {};
    // if status found in request add it to toSearch
    if(status){
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

module.exports = {
    getGrievance
}