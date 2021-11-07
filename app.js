// Entry point of the REST API

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// For parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connecting to Database (MongoDB Atlas)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
).then(() => {
    console.log("Database Connected!");
})
.catch((err) => {
    console.log(err);
})

// importing middleware
const { authAdmin } = require("./middleware/authAdmin");
const { authStudent } = require("./middleware/authStudent");

// importing admin routes
const registerAdmin = require("./routes/Admin/registerAdmin");
const loginAdmin = require("./routes/Admin/loginAdmin");
const addCompany = require("./routes/Admin/addCompany");
const reduceCredit = require("./routes/Admin/reduceCredit");
const { getStudents, setStatus } = require("./routes/Admin/getStudents");
const addNotice = require("./routes/Admin/addNotice");
const addContact = require("./routes/Admin/addContact");
const changePasswordAdmin = require("./routes/Admin/changePassword");

// using admin routes
app.use('/admin', registerAdmin);           // to register an admin
app.use('/admin', loginAdmin);              // to login admin
app.use('/admin', authAdmin);               // middleware to authenticate admin
app.use('/admin', addCompany);              // to add a visiting company
app.use('/admin', reduceCredit);            // route to reduce credit of a student by reg_no and number of credits to reduce
app.use('/admin', getStudents);             // to get all status with status in get_status field
app.use('/admin', setStatus);               // to set status of a student by giving reg_no and a set_status field in which the status will be change
app.use('/admin', addNotice);               // to publish a notice
app.use('/admin', addContact);              // to add a new contact
app.use('/admin', changePasswordAdmin);     // to change password of an admin account

// importing student routes
const registerStudent = require("./routes/Students/registerStudent");
const loginStudent = require("./routes/Students/loginStudent");
const updateStudent = require("./routes/Students/update/updateStudent");
const updatePhoto = require("./routes/Students/update/updatePhoto");
const updateResume = require("./routes/Students/update/updateResume");
const changePassword = require("./routes/Students/changePassword");
const registerForCompany = require("./routes/Students/registerForCompany");
const getRegisteredCompanies = require("./routes/Students/getRegisteredCompanies");

//using Student routes
app.use('/student', registerStudent);        // to register a student
app.use('/student', loginStudent);           // to login a student
app.use('/student', authStudent);            // middleware to authenticate a student
app.use('/student', updateStudent);          // to update student information
app.use('/student', updatePhoto);            // to update student photo
app.use('/student', updateResume);           // to update student resume
app.use('/student', changePassword);         // to change student password
app.use('/student', registerForCompany);     // to register for a company
app.use('/student', getRegisteredCompanies); // to get companies for which student registered

//importing common routes
const currentOpening = require("./routes/currentOpening");

//using common routes
app.use(currentOpening);                        // to get current openings

const { getUser } = require('./controllers/getUser');
const { getNotice } = require('./controllers/getNotice');
const { getStats } = require('./controllers/getStats');
const { getContact } = require('./controllers/getContact');
const { getCompany } = require('./controllers/getCompany');
app.get('/', getUser);
app.get('/getNotice', getNotice);
app.get('/getStats', getStats);
app.get('/getContact', getContact);
app.post('/getCompany', getCompany);

//defining port to run the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});