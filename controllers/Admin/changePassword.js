const adminModel = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const changePassword = (req, res, next) => {
    const response = {};
    // getting email and password from the jwt token
    const email = req.user.email;
    let password = req.user.password;
    // getting current password and new password from user
    const current_password = req.body.current_password;
    const new_password = req.body.new_password;
    // if any field is empty return
    if(!current_password || !new_password){
        console.log("All fields are required");
        response.success = false;
        response.message = "All fields are required";
        return res.send(response);
    }
    // if current password and new password are same
    if (current_password == new_password) {
        console.log("Same current and new password");
        response.success = false;
        response.message = "Same current and new password";
        return res.send(response);
    }
    // if current password is not correct
    if (!bcrypt.compareSync(current_password, password)) {
        console.log("Invalid password");
        response.success = false;
        response.message = "Incorrect password";
        return res.send(response);
    }
    adminModel.findOne({ email }, (err, admin) => {
        if (err || !admin) {
            // If admin is not found or some error occurred 
            console.log("admin not found");
            response.success = false;
            response.message = "An error occured, try again";
            return res.send(response);
        }
        else if (password != admin.password) {
            // If password doesn't match
            console.log("Invalid password");
            response.success = false;
            response.message = "Incorrect password";
            return res.send(response);
        }
        else {
            // hash the new password and create new jwt token
            const newHash = bcrypt.hashSync(new_password, 5)
            admin.password = newHash;
            password = newHash;
            // creating token with the new password
            const token = jwt.sign({ password, email }, process.env.TOKEN_KEY, { expiresIn: "100000h" });
            // Updating details in the database
            const updateadmin = admin;
            adminModel.findByIdAndUpdate(admin._id, updateadmin, (err, admin) => {
                if (err) {
                    console.log(err);
                }
            });
            // returning updated admin and token with the response
            response.success = true;
            response.message = "Password changed successfully";
            response.token = token;
            return res.send(response);
        }
    })
}

module.exports = {
    changePassword
}