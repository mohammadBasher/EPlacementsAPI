const companyModel = require("../models/Company");

const getCompany = (req, res, next) => {
    const response = {};
    const id = req.body.id;
    // fetching all the notices 
    companyModel.findOne({ _id: id }, (err, company) => {
        // if some error occurred return from here
        if (err) {
            response.success = false;
            response.message = "Some error occurred";
            console.log(err);
            return res.send(response);
        }
        // return fetched notices with the response
        response.success = true;
        response.message = "Company fetched successfully";
        response.company = company;
        return res.send(response);
    })
}

module.exports = {
    getCompany
}