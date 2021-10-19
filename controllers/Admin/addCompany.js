const CompanyModel = require("../../models/Company");

const addCompany = (req,res,next) => {
    const data = req.body;
    console.log(data);
    const response = {};
    const name = data.name;
    const job_profile = data.job_profile;
    const job_location = data.job_location;
    CompanyModel.findOne({name, job_profile, job_location},(err,company)=>{
        if(err){
            response.success = false;
            response.msg = "An error occured, try again";
            console.log(err);
            return res.send(response);
        }
        else if(company){
            response.success = false;
            response.msg = "Company already exists with given name and job profile";
            return res.send(response);
        }
        else{
            const newCompany = new CompanyModel(data);
            newCompany.save((err,company)=>{
                if(err){
                    response.success = false;
                    response.message = "An error occured, try again";
                    console.log(err);
                    return res.send(response);
                }
                response.success = true;
                response.message = "Company added successfully";
                response.company = company;
                return res.send(response);
            })
        }
    });
}

module.exports = {
    addCompany
}