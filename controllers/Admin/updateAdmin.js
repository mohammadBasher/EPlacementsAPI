const adminModel = require("../../models/Admin");

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

module.exports = {
    updateAdmin
}