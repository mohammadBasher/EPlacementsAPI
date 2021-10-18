// This is the entry point of the APP...

// To interpret .env file content
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

// For parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.json());

// Connecting Database (MongoDB Atlas)
mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log("Database Connect!!!");
})
.catch((err)=>{
    console.log(err);
})


//importing middleware
const {authAdmin} = require("./middleware/authAdmin");
const {authStudent} = require("./middleware/authStudent");

//importing admin routes
const registerAdmin = require("./routes/Admin/registerAdmin");
const loginAdmin = require("./routes/Admin/loginAdmin");
const addCompany = require("./routes/Admin/addCompany");


// using admin routes
app.use('/admin',registerAdmin);
app.use('/admin',loginAdmin);
app.use('/admin',authAdmin);
app.use('/admin',addCompany);


// importing student routes
const registerStudent = require("./routes/Students/registerStudent");
const loginStudent = require("./routes/Students/loginStudent");
const updateStudent = require("./routes/Students/update/updateStudent");
const updatePhoto = require("./routes/Students/update/updatePhoto");
const updateResume = require("./routes/Students/update/updateResume");
const changePassword = require("./routes/Students/changePassword");


//using Student routes
app.use('/student',registerStudent);
app.use('/student',loginStudent);
app.use('/student',authStudent);
app.use('/student',updateStudent);
app.use('/student',updatePhoto);
app.use('/student',updateResume);
app.use('/student',changePassword);

//defining port to run the server
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server is running on "+PORT);
});