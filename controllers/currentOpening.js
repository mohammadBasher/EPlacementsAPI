const companyModel = require("../models/Company");

const currentOpening = (req,res,next)=>{
    const response = {};

    companyModel.find({},(err,company)=>{
        if(err){
            response.success = false;
            response.message = "Some error occurred ";
            console.log(err);
            return res.send(response);
        }
        response.success = true;
        response.message = "Current opening fetched successfully";
        response.company = company;
        return res.send(response);
    })
}

module.exports = {
    currentOpening
}