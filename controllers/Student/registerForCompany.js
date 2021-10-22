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
            else if(student.credits<4){
                // If student's credits are less than 4 
                // then he will not be able to register for the company
                response.success = false;
                response.message = "Your credits are less than 4. So you are not eligible to apply";
                return res.send(response);
            }
            else if(student.status!="verified"){
                // If student's status is not verified 
                // wheather registered,completed,unverified or placed
                // then also he will not be able to register
                response.success = false;
                response.message = "Your profile is not verified";
                return res.send(response);
            }
            else{
                // As student is eligible to apply
                // checking wheather student already registered for this company
                const registration = data;
                registration.reg_no = reg_no;
                const ifRegister = await registerationModel.findOne({company_id:data.company_id,reg_no:reg_no});
                if(!ifRegister){
                    // if student not register till now
                    const deadline = await companyModel.findOne({_id:data.company_id},{reg_deadline:1,_id:0});
                    const branch = await companyModel.findOne({_id:data.company_id},{allowed_branches:1,_id:0});
                    // checking if user's branch is allowed in this company or not
                    if(branch.allowed_branches.indexOf(student.branch)==-1){
                        console.log("Branch not allowed");
                        response.success = false;
                        response.message = "Your branch is not allowed in this company";
                        return res.send(response);
                    }
                    const cur_time = new Date().getTime();
                    // If registration deadline of the company expired 
                    // return from here...
                    if(deadline.reg_deadline<cur_time){
                        console.log("deadline expired");
                        response.success = false;
                        response.message = "Registration deadline expired!!";
                        return res.send(response);
                    }
                    else{
                        // creating rew registration
                        const newRegistration = new registerationModel(registration);
                        newRegistration.save((err,registration)=>{
                            if(err){
                                // if some error occurred return from here
                                console.log(err);
                                response.success = false;
                                response.message = "An error occurred";
                                return res.send(response);
                            }
                            else{
                                // now return registration details with the response
                                response.success = true;
                                response.message = "Registration completed successfully";
                                response.registration = registration;
                                return res.send(response);
                            }
                        })
                    }
                }
                else{
                    // As student already registered for this company
                    // return from here
                    response.success = false;
                    response.message = "You have already registered for this company";
                    return res.send(response);
                }
            }
        }

    }catch(err){
        // if some error occurred 
        // catch it and print on console
        response.success = false;
        response.message = "An error occured";
        console.log(err);
        return res.send(response);
    }
}

module.exports = {
    registerForCompany
}