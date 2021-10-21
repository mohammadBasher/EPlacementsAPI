const registerationModel = require("../../models/Registration");
const companyModel = require("../../models/Company");

const getRegisteredCompanies = async(req,res,next)=>{
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    try {
        // fetching registered companies ids from registerationModel
        const companyIds = await registerationModel.find({reg_no},{company_id:1,_id:0,timestamp:1});

        if(!companyIds){
            response.success = false;
            response.message = "An error occured while fetching registered companies";
            console.log(err);
            return res.send(response);
        }
        // an array to store company details
        const companies = [];
        // traving companyIds to find details of registered companies
        for(let i=0; i<companyIds.length; i++){
            const company_id = companyIds[i].company_id;
            const tmp = {};
            // storing details of registered companies fetched using company id
            tmp.company = await companyModel.findOne({_id:company_id});
            // also adding time of registration in responses
            tmp.timestamp = companyIds[i].timestamp;
            // pushing it into companies array
            companies.push(tmp);
        }
        //finally returing response
        response.success = true;
        response.message = "Registered companies fetched successfully";
        response.companies = companies;
        return res.send(response);
    }
    catch(err) {
        // if some error occurred return this
        response.success = false;
        response.message = "An error occured";
        console.log(err);
        return res.send(response);
    }
}

module.exports = {
    getRegisteredCompanies
}