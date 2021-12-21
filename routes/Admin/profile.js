const express = require("express")

//importing controler for registering,loging and updating admin
const { registerAdmin, loginAdmin, updateAdmin, changePassword } = require("../../controllers/Admin/profile")

const router = express.Router();

const register = router.post('/registerAdmin', registerAdmin);
const login = router.post('/loginAdmin', loginAdmin);
const update = router.post('/updateAdmin', updateAdmin);
const password = router.post('/changePassword', changePassword);

// creating routes for register, login and update
module.exports = {
    registerAdmin: register,
    loginAdmin: login,
    updateAdmin: update,
    changePasswordAdmin: password
}