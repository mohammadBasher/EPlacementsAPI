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
    }).sort({ time: 'desc' }); // sorting results to display latest at the top
}

module.exports = {
    getNotice
}