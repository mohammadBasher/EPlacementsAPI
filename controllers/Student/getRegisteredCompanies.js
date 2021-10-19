const registerationModel = require("../../models/Registration");
const companyModel = require("../../models/Company");

const getRegisteredCompanies = async(req,res,next)=>{
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    registerationModel.find({reg_no},{company_id:1,_id:0},async(err,companyIds)=>{
        if(err){
            // If student is not found or some error occurred return 
            response.success = false;
            response.message = "An error occured while fetching registered companies";
            console.log(err);
            return res.send(response);
        }
        else{
            const companies = [];
            console.log(companyIds);
            companyIds.forEach(company=>{
            await companyModel.findOne({_id:company.company_id},(err,company)=>{
                    companies.push(company);
                    console.log(company);
                    console.log(companies);
                })
                console.log(companies);
            })
            console.log(Object.values(companyIds));
            const temp = Object.values(companyIds);
            console.log(temp);
            companyModel.find({_id:{$in:temp}},(err,companies)=>{
                console.log(companies);
            })
            console.log(companies);
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