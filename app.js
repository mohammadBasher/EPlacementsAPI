// This is the entry point of the APP...

// To interpret .env file content
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

// For parsing incoming requests
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

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

//importing admin routes
const registerAdmin = require("./routes/Admin/registerAdmin");
const authAdmin = require("./routes/Admin/authAdmin");
const loginAdmin = require("./routes/Admin/loginAdmin");



// using admin routes
app.use('/admin',registerAdmin);
app.use('/admin',authAdmin);
app.use('/admin',loginAdmin);


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server is running on "+PORT);
});