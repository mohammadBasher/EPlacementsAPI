
// This file contains functions for
// getStats - to get placement stats for past years

const statisticsModel = require("../models/Statistics");

const getStats = (req, res, next) => {
    // fetching year in request query
    const year = req.query.year;
    const response = {};

    // search for that year in the database
    statisticsModel.findOne({ "year": year }, (err, stats) => {
        if (err || stats == null) {
            // if some error occurred return from here
            console.log(err);
            response.success = false;
            response.message = "An error occurred";
            return res.send(response);
        }
        // return found data with the response
        response.success = true;
        response.message = "Statistics fetched successfully";
        response.stats = stats;
        return res.send(response);
    });
}

module.exports = {
    getStats
}