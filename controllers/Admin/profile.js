
// This file contains functions for
// loginAdmin - to login an admin
// registerAdmin - to register an admin
// updateAdmin - to update an admin
// changePassword - to change password for admin

const adminModel = require("../../models/Admin")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

// Function to register an Admin
const registerAdmin = (req, res, next) => {
    // fetching email from request's body
    const email = req.body.email;
    const response = {};
    // if any of the required field is empty 
    // return from here
    if (!req.body.name || !req.body.email || !req.body.password || !req.file.filename) {
        response.success = false;
        response.message = "All fields are required";
        res.send(response);
    }
    // checking wheather any other admin registered with the given email
    adminModel.findOne({ email }, (err, user) => {
        // if some error occurred return from here
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "An error occured, try again";
            return res.send(response);
        }
        // return if any user is found with that email
        if (user) {
            response.success = false;
            response.message = "Admin already exists";
            return res.send(response);
        }
        else {
            // create a new admin with the given details
            const admin = {
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 5),
                photo: req.body.photoURL
            }
            const newAdmin = new adminModel(admin);
            const password = admin.password;
            // saving newly created admin
            newAdmin.save((err, user) => {
                // if some error occurred while saving return
                if (err) {
                    console.log(err);
                    response.success = false;
                    response.message = "An error occured, try again";
                    return res.send(response);
                }
                else {
                    // Now admin is registered successfully, create token using jwt and return
                    const token = jwt.sign({ password, email }, process.env.TOKEN_KEY, { expiresIn: "100000h" });
                    response.success = true;
                    response.message = "Admin registered successfully";
                    response.user = user;
                    response.token = token;
                    return res.send(response);
                }
            })
        }
    })
}

// Function to login an admin
const loginAdmin = (req, res, next) => {
    // fetching email and password from request's body
    const email = req.body.email;
    var password = req.body.password;
    const response = {};
    // checking if any of the field is empty
    if (!req.body.email || !req.body.password) {
        response.success = false;
        response.message = "Email no. and password are required";
        return res.send(response);
    }
    // Checking wheather any account registered with that email
    adminModel.findOne({ email }, { photo: 0 }, (err, user) => {
        // if some error occurred or user not found
        // return response with success false
        if (err || !user) {
            console.log("Please register first");
            response.success = false;
            response.message = "Admin not registered";
            return res.send(response);
        }
        // Now compare password using bcrypt as saved password is hashed
        // if password doesn't match return from here
        else if (!bcrypt.compareSync(password, user.password)) {
            response.success = false;
            response.message = "Incorrect Password";
            return res.send(response);
        }
        else {
            // create token using jwt and return
            password = user.password;
            const token = jwt.sign({ password, email }, process.env.TOKEN_KEY, { expiresIn: "10000h" });
            response.success = true;
            response.message = "Logged in successfully";
            response.user = user;
            response.token = token;
            return res.send(response);
        }
    })
}

// Function to update an Admin
const updateAdmin = (req, res, next) => {
    // response object to be send to admin in response
    const response = {};
    // getting email and password from the jwt token
    const email = req.user.email;
    const password = req.user.password;
    // storing incoming information or information user want to update
    const data = req.body;
    // console.log(email,password);
    adminModel.findOne({ email }, (err, admin) => {
        if (err || !admin) {
            // If admin is not found or some error occurred return 
            response.success = false;
            response.message = "Some error occurred while finding email";
            return res.send(response);
        }
        else if (password != admin.password) {
            // If password doesn't match return with Invalid Password
            response.success = false;
            response.message = "Invalid Password";
            return res.send(response);
        }
        else {
            // Using data indexes as keys to update only incoming fields in admin
            Object.keys(data).forEach((key) => {
                if (key == "password") {
                    // This should not update these fields
                }
                else {
                    admin[key] = data[key];
                }
            });
            // initialise a updateAdmin to store updated details
            const updateAdmin = admin;
            // updating admin in the database
            adminModel.findByIdAndUpdate(admin._id, updateAdmin, (err, admin) => {
                if (err) {
                    console.log(err);
                }
            });
            // return success = true with the response
            response.success = true;
            response.message = "Profile updated";
            return res.send(response);
        }
    })
}

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
    registerAdmin,
    loginAdmin,
    updateAdmin,
    changePassword
}