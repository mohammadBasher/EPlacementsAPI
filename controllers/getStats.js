const statsModel = require("../models/stats");

const getStats = (req,res,next) => {
    const year = req.body.year;
    const response = {};
    statsModel.find({year},(err,stats)=>{
        if(err){
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }
        response.success = true;
        response.message = "Stats fetched successfully";
        response.stats = stats;
        return res.send(response);
    });
}

module.exports = {
    getStats
}