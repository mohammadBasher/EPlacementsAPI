
// This file contains functions for
// loginStudent - to login a student
// registerStudent - to register a student
// updateStudent - to update student details if profile is not locked
// updateResume - to update resume even if profile is locked
// updatePhoto - to update photo even if profile is locked
// changePassword - to change password

const studentModel = require("../../models/Student");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginStudent = (req, res, next) => {
    // fetching reg_no and password from request's body
    const reg_no = req.body.reg_no;
    var password = req.body.password;
    const response = {};
    // checking if any of the field is empty
    if (!req.body.reg_no || !req.body.password) {
        console.log("Empty fields");
        response.success = false;
        response.message = "Registration no. and password are required";
        return res.send(response);
    }
    // searching student with the given reg_no
    studentModel.findOne({ reg_no }, { photo: 0, resume: 0 }, (err, user) => {
        // if some error occurred or student not found return from here
        if (err || !user) {
            console.log("Student not registered");
            response.success = false;
            response.message = "Student not registered";
            res.send(response);
        }
        // Now compare the password with the saved password
        else if (!bcrypt.compareSync(password, user.password)) {
            console.log("Incorrect password");
            response.success = false;
            response.message = "Incorrect password, try again";
            res.send(response);
        }
        else {
            // return if password is also matched create token using jwt
            password = user.password;
            const token = jwt.sign({ password, reg_no }, process.env.TOKEN_KEY, { expiresIn: "100000h" });
            response.success = true;
            response.message = "Student logged in successfully";
            response.user = user;
            response.token = token;
            res.send(response);
        }
    })
}

const registerStudent = (req, res, next) => {
    // Checking if any of the field is empty
    const response = {};
    if (!req.body.reg_no || !req.body.password) {
        console.log("Empty fields")
        response.success = false;
        response.message = "Registration no. and password are required";
        return res.send(response);
    }

    const reg_no = req.body.reg_no;
    // Checking whether Student with reg_no already registered
    studentModel.findOne({ reg_no }, (err, user) => {
        if (err) {
            console.log(err);
            response.success = false;
            response.message = "An error occurred, try again";
            return res.send(response);
        }
        if (user) {
            // if student exist send response
            console.log("Student already exists");
            response.success = false;
            response.message = "Student already exists";
            return res.send(response);
        }
        else {
            // if student is not found then register a new student
            const student = {
                reg_no: req.body.reg_no,
                password: bcrypt.hashSync(req.body.password, 5), // saving password with hashing
                status: "registered", // This is to check current status of the student i.e. registered, verified, unverified, offered etc.
                credits: "10" // intially 10 credits will be alloted to every newly registered student
            }
            const newStudent = new studentModel(student);
            const password = student.password;
            newStudent.save((err, user) => {
                if (err) {
                    console.log(err);
                    response.success = false;
                    response.message = "An error occured, try again";
                    return res.send(response);
                }
                else {
                    // create token using jwt and return
                    const token = jwt.sign({ password, reg_no }, process.env.TOKEN_KEY, { expiresIn: "10000h" });
                    response.success = true;
                    response.message = "Student registered successfully";
                    response.user = user;
                    response.token = token;
                    return res.send(response);
                }
            })
        }
    })
}

const updateStudent = (req, res, next) => {
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    // storing incoming information or information user want to update
    const data = req.body;
    // console.log(reg_no,password);
    studentModel.findOne({ reg_no }, (err, student) => {
        if (err || !student) {
            // If student is not found or some error occurred return 
            response.success = false;
            response.message = "Some error occurred while finding reg_no";
            return res.send(response);
        }
        else if (password != student.password) {
            // If password doesn't match return with Invalid Password
            response.success = false;
            response.message = "Invalid Password";
            return res.send(response);
        }
        else if (student.status == "verified") {
            // If profile is verified return (Because user can't update details if his profile is verified except resume and photo)
            response.success = false;
            response.message = "Your profile is verified and locked";
            return res.send(response);
        }
        else {
            // Using data indexes as keys to update only incoming fields in student
            Object.keys(data).forEach((key) => {
                if (key == "password" || key == "resume" || key == "photo" || key == "credits" || key == "status" || key == "remarks") {
                    // This should not update these fields
                }
                else {
                    student[key] = data[key];
                }
            });
            student.status = "completed";
            // initialise a updateStudent to store updated details
            const updateStudent = student;
            // updating student in the database
            studentModel.findByIdAndUpdate(student._id, updateStudent, (err, student) => {
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

const updateResume = (req, res, next) => {
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    studentModel.findOne({ reg_no }, (err, student) => {
        if (err || !student) {
            // If student is not found or some error occurred return
            console.log("Reg. No. not found");
            response.success = false;
            response.message = "An error occurred while finding the student";
            return res.send(response);
        }
        else if (password != student.password) {
            // If password doesn't match, return with Invalid Password
            console.log("Invalid password");
            response.success = false;
            response.message = "Invalid Password";
            return res.send(response);
        }
        else {
            // If resumeURL is not valid
            if(req.body.resumeURL == null || req.body.resumeURL == "") {
                console.log("Invalid resume URL");
                response.success = true;
                response.message = "Invalid resume URL";
                return res.send(response);
            }
            // updating resume in the found student
            student.resume = req.body.resumeURL;
            // initialise a updateStudent to store updated details
            const updateStudent = student;
            // Update details in the database
            studentModel.findByIdAndUpdate(student._id, updateStudent, (err, student) => {
                if (err) {
                    console.log(err);
                    response.success = false;
                    response.message = "An error occurred";
                    return res.send(response);
                }
                else {
                    response.success = true;
                    response.message = "Resume updated successfully";
                    return res.send(response);
                }
            });
        }
    })
}

const updatePhoto = (req, res, next) => {
    // response object to be send to student in response
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    const password = req.user.password;
    studentModel.findOne({ reg_no }, (err, student) => {
        if (err || !student) {
            // If student is not found or some error occurred return 
            console.log("Reg. No. not found")
            response.success = false;
            response.message = "An error occurred while finding the student";
            return res.send(response);
        }
        else if (password != student.password) {
            // If password doesn't match, return with Invalid Password
            console.log("Invalid password");
            response.success = false;
            response.message = "Invalid Password";
            return res.send(response);
        }
        else {
            // If photoURL is not valid
            if(req.body.photoURL == null || req.body.photoURL == "") {
                console.log("Invalid photo URL");
                response.success = true;
                response.message = "Invalid photo URL";
                return res.send(response);
            }
            // Changing photo in the found student
            student.photo = req.body.photoURL;
            // initialise a updateStudent to store updated details
            const updateStudent = student;
            // Update details in the database
            studentModel.findByIdAndUpdate(student._id, updateStudent, (err, student) => {
                if (err) {
                    console.log(err);
                    response.success = false;
                    response.message = "An error occurred";
                    return res.send(response);
                }
                else {
                    response.success = true;
                    response.message = "Photo updated successfully";
                    return res.send(response);
                }
            });
        }
    })
}

const changePassword = (req, res, next) => {
    const response = {};
    // getting reg_no and password from the jwt token
    const reg_no = req.user.reg_no;
    let password = req.user.password;
    // getting current password and new password from user
    const current_password = req.body.current_password;
    const new_password = req.body.new_password;
    // if any field is empty return
    if (!current_password || !new_password) {
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
    studentModel.findOne({ reg_no }, (err, student) => {
        if (err || !student) {
            // If student is not found or some error occurred 
            console.log("Student not found");
            response.success = false;
            response.message = "An error occured, try again";
            return res.send(response);
        }
        else if (password != student.password) {
            // If password doesn't match
            console.log("Invalid password");
            response.success = false;
            response.message = "Incorrect password";
            return res.send(response);
        }
        else {
            // hash the new password and create new jwt token
            const newHash = bcrypt.hashSync(new_password, 5)
            student.password = newHash;
            password = newHash;
            // creating token with the new password
            const token = jwt.sign({ password, reg_no }, process.env.TOKEN_KEY, { expiresIn: "100000h" });
            // Updating details in the database
            const updateStudent = student;
            studentModel.findByIdAndUpdate(student._id, updateStudent, (err, student) => {
                if (err) {
                    console.log(err);
                }
            });
            // returning updated student and token with the response
            response.success = true;
            response.message = "Password changed successfully";
            response.token = token;
            return res.send(response);
        }
    })
}

module.exports = {
    loginStudent,
    registerStudent,
    updateStudent,
    updateResume,
    updatePhoto,
    changePassword
}
