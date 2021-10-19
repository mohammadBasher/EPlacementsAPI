const registerationModel = require("../../models/Registration");
const companyModel = require("../../models/Company");

const getRegisteredCompanies = (req,res,next)=>{
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    companyModel.find({reg_no},(err,companies)=>{
        if(err){
            // If student is not found or some error occurred return 
            response.success = false;
            response.message = "Some error occurred while fetching companies";
            return res.send(response);
        }
        else{
            response.success = true;
            response.message = "Companiees fetched successfully";
            response.companies = companies;
            return res.send(companies);
        }
    })
}

module.exports = {
    getRegisteredCompanies
}