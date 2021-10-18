const CompanyModel = require("../../models/Company");

const addCompany = (req,res,next) => {
    const data = req.body;
    // console.log(data);
    const response = {};
    const newCompany = new CompanyModel(data);
    newCompany.save((err,company)=>{
        if(err){
            response.success = false;
            response.message = "Some error occurred";
            // console.log(err);
            return res.send(response);
        }
        response.success = true;
        response.message = "Company added successfully";
        return res.send(response);
    })
}

module.exports = {
    addCompany
}