const CompanyModel = require("../../models/Company");

const addCompany = (req,res,next) => {
    const data = req.body;
    console.log(data);
    const response = {};
    const name = data.name;
    CompanyModel.findOne({name},(err,company)=>{
        if(err){
            console.log(err);
        }
        else if(company){
            response.success = false;
            response.msg = "company already added";
            return res.send(response);
        }
        else{
            const newCompany = new CompanyModel(data);
            newCompany.save((err,company)=>{
                if(err){
                    response.success = false;
                    response.message = "Some error occurred";
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