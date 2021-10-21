const CompanyModel = require("../../models/Company");

const addCompany = (req,res,next) => {
    // fetching company's data from the request
    const data = req.body;
    console.log(data);
    const response = {};
    const name = data.name;
    const job_profile = data.job_profile;
    const job_location = data.job_location;
    // checking wheather a company already registered with that name, profile and location
    CompanyModel.findOne({name, job_profile, job_location},(err,company)=>{
        // if some error occurred return from here
        if(err){
            response.success = false;
            response.msg = "An error occured, try again";
            console.log(err);
            return res.send(response);
        }
        // if some company already exists
        // tell the admin and return
        else if(company){
            response.success = false;
            response.msg = "Company already exists with given name and job profile";
            return res.send(response);
        }
        else{
            // Now create a newCompany with given data and save it
            const newCompany = new CompanyModel(data);
            newCompany.save((err,company)=>{
                // if some error occurred return from here 
                if(err){
                    response.success = false;
                    response.message = "An error occured, try again";
                    console.log(err);
                    return res.send(response);
                }
                // Now return saved company's details with the response
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