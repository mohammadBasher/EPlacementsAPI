// This file contains functions for
// getNotice - to get all the posted notices

const noticeModel = require("../models/Notice");

const getNotice = (req, res, next) => {
    const response = {};
    // fetching all the notices 
    noticeModel.find({}, (err, notice) => {
        // if some error occurred return from here
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "Some error occurred";
            return res.send(response);
        }

        // return fetched notices with the response
        response.success = true;
        response.message = "Notice fetched successfully";
        response.notices = notice;
        return res.send(response);
    }).sort({ timestamp: -1 });
}

module.exports = {
    getNotice
}