const studentModel = require("../../../models/Student");
const fs = require("fs");
const path = require("path");

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
            response.message = "Some error occurred while finding reg_no";
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
            // Changing photo in the found student
            student.photo = {
                data: fs.readFileSync(path.join(__dirname + "/../../../" + './public/' + req.file.filename)),
                contentType: 'image/png'
            }
            // initialise a updateStudent to store updated details
            const updateStudent = student;
            // Update details in the database
            studentModel.findByIdAndUpdate(student._id, updateStudent, (err, student) => {
                if (err) {
                    console.log(err);
                }
            });
            // return success=true with the response
            response.success = true;
            response.message = "Photo updated";
            return res.send(response);
        }
    })
}

module.exports = {
    updatePhoto
}