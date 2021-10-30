const statsModel = require("../models/stats");

const getStats = (req, res, next) => {
    // fetching year in the request's body
    const year = req.body.year;
    const response = {};
    // search for that year in the database
    statsModel.find({ year }, (err, stats) => {
        if (err) {
            // if some error occurred return from here
            console.log(err);
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }
        // return founded data with the response
        response.success = true;
        response.message = "Stats fetched successfully";
        response.stats = stats;
        return res.send(response);
    });
}

module.exports = {
    getStats
}