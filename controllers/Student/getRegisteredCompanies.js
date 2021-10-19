const registerationModel = require("../../models/Registration");
const companyModel = require("../../models/Company");

const getRegisteredCompanies = async(req,res,next)=>{
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    try {
        const companyIds = await registerationModel.find({reg_no},{company_id:1,_id:0});
        if(!companyIds){
            response.success = false;
            response.message = "An error occured while fetching registered companies";
            console.log(err);
            return res.send(response);
        }

        const companies = [];
        for(let i=0; i<companyIds.length; i++){
            const company_id = companyIds[i].company_id;
            const tmp = await companyModel.findOne({_id:company_id});
            companies.push(tmp);
            console.log(tmp);
        }

        console.log(companies);
        response.success = true;
        response.message = "Registered companies fetched successfully";
        response.companies = companies;
        return res.send(companies);
    }
    catch(err) {
        response.success = false;
        response.message = "An error occured";
        console.log(err);
        return res.send(response);
    }
}

module.exports = {
    getRegisteredCompanies
}