// Entry point of the REST API

require("dotenv").config();                 // to configure environment variables or .env file
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

// Importing Middlewares
const { authAdmin } = require("./middleware/authAdmin");
const { authStudent } = require("./middleware/authStudent");

// Importing Admin routes
const { registerAdmin, loginAdmin, updateAdmin, changePasswordAdmin } = require('./routes/Admin/profile');
const { addCompany } = require("./routes/Admin/company");
const { addResult,loadCompanies,loadStudents } = require("./routes/Admin/result");
const { getStudents, setStatus, reduceCredit } = require("./routes/Admin/student");
const { addNotice } = require("./routes/Admin/notice");
const { addContact } = require("./routes/Admin/contact");
const { getGrievance, resolveGrievance } = require('./routes/Admin/grievance');
const { getInsights } = require("./routes/Admin/insights");

// Using Admin routes
app.use('/admin', registerAdmin);           // to register an admin
app.use('/admin', loginAdmin);              // to login admin
app.use('/admin', authAdmin);               // middleware to authenticate admin
app.use('/admin', addCompany);              // to add a visiting company
app.use('/admin', addResult);               // to announce result for a company
app.use('/admin', loadCompanies);           // to fetch companies whose result is not announced yet
app.use('/admin',loadStudents);             // to fetch the list of students registered for a company by company_id
app.use('/admin', reduceCredit);            // route to reduce credit of a student by reg_no and number of credits to reduce
app.use('/admin', getStudents);             // to get all status with status in get_status field
app.use('/admin', setStatus);               // to set status of a student by giving reg_no and a set_status field in which the status will be change
app.use('/admin', addNotice);               // to publish a notice
app.use('/admin', addContact);              // to add a new contact
app.use('/admin', changePasswordAdmin);     // to change password of an admin account
app.use('/admin', getGrievance);            // to get grievances
app.use('/admin', resolveGrievance);        // to resolve grievances
app.use('/admin', updateAdmin);             // to update admin
app.use('/admin', getInsights);             // to get placement related stats

// Importing Student routes
const { loginStudent, registerStudent, updateStudent, updatePhoto, updateResume, changePassword } = require('./routes/Students/profile');
const { registerForCompany, getRegisteredCompanies } = require('./routes/Students/company');
const { addGrievance } = require('./routes/Students/grievance');
const { addExperience, getExperience, checkEligibility } = require('./routes/Students/experience');
const { searchStudent } = require('./routes/Students/search');

// Using Student routes
app.use('/student', registerStudent);        // to register a student
app.use('/student', loginStudent);           // to login a student
app.use('/student', authStudent);            // middleware to authenticate a student
app.use('/student', updateStudent);          // to update student information
app.use('/student', updatePhoto);            // to update student photo
app.use('/student', updateResume);           // to update student resume
app.use('/student', changePassword);         // to change student password
app.use('/student', registerForCompany);     // to register for a company
app.use('/student', getRegisteredCompanies); // to get companies for which student registered
app.use('/student', addGrievance);           // to add grievances
app.use('/student', addExperience);          // to add experience
app.use('/student', getExperience);          // to get experiences
app.use('/student', checkEligibility);       // to check eligibility
app.use('/student',searchStudent);           // to return a list of verified and registered students

// Importing Common routes
const { getUser } = require('./controllers/user');
const { getNotice } = require('./controllers/notice');
const { getStats } = require('./controllers/stats');
const { getCompany, currentOpening } = require('./controllers/company');
const { getContact } = require('./controllers/contact');

// Using Common routes
app.get('/', getUser);                        // to get the detail of current logged in user
app.get('/getNotice', getNotice);             // to get the notices
app.get('/getStats', getStats);               // to get the placement status
app.get('/currentOpening', currentOpening);   // to get the current openings
app.post('/getCompany', getCompany);          // to get the company by its id
app.get('/getContact', getContact);           // to get contact details of TPRs

// Defining port to run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});