const studentModel = require("../../../models/Student");

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

module.exports = {
    updatePhoto
}