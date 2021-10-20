const registerationModel = require("../../models/Registration");
const studentModel = require("../../models/Student");
const companyModel = require("../../models/Company");

const registerForCompany = async(req,res,next)=>{
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // storing incoming information or information user want to update
    const data = req.body;
    try{
        const student = await studentModel.findOne({reg_no});
        if(!student){
            // If student is not found or some error occurred return 
            response.success = false;
            response.message = "An error occurred, try again";
            return res.send(response);
        }
        else{
            if(password!=student.password){
                // If password doesn't match return with Invalid Password
                response.success = false;
                response.message = "Invalid password, login again";
                return res.send(response);
            }
            else{
                const registration = data;
                registration.reg_no = reg_no;
                const ifRegister = await registerationModel.findOne({company_id:data.company_id,reg_no:reg_no});
                if(!ifRegister){
                    const deadline = await companyModel.findOne({_id:data.company_id},{reg_deadline:1,_id:0});
                    const cur_time = new Date().getTime();
                    if(deadline.reg_deadline<cur_time){
                        console.log("deadline expired");
                        response.success = false;
                        response.message = "Registration deadline expired!!";
                        return res.send(response);
                    }
                    else{
                        const newRegistration = new registerationModel(registration);
                        newRegistration.save((err,registration)=>{
                            if(err){
                                console.log(err);
                                response.success = false;
                                response.message = "An error occurred";
                                return res.send(response);
                            }
                            else{
                                response.success = true;
                                response.message = "Registration completed successfully";
                                response.registration = registration;
                                return res.send(response);
                            }
                        })
                    }
                }
                else{
                    response.success = false;
                    response.message = "You have already registered for this company";
                    return res.send(response);
                }
            }
        }

    }catch(err){
        response.success = false;
        response.message = "An error occured";
        console.log(err);
        return res.send(response);
    }
}

module.exports = {
    registerForCompany
}