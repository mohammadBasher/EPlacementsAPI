const adminModel = require("../../models/Admin")
const fs = require("fs");
const path = require("path")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

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

module.exports = {
    registerAdmin
}