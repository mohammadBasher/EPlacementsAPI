const companyModel = require("../models/Company");

const currentOpening = (req, res, next) => {
    const response = {};
    // storing current time
    const currentTime = new Date().getTime();
    // fetching all the companies with deadline greater than current time
    companyModel.find({ reg_deadline: { $gt: currentTime } }, (err, company) => {
        if (err) {
            // if some error occurred return from here
            console.log(err);
            response.success = false;
            response.message = "Some error occurred ";
            return res.send(response);
        }
        // return all fetched companies with the response
        response.success = true;
        response.message = "Current opening fetched successfully";
        response.company = company;
        return res.send(response);
    })
}

module.exports = {
    currentOpening
}