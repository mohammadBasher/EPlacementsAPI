// This is the entry point of the APP...

// To interpret .env file content
require("dotenv").config();
const express = require("express");

const app = express();


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server is running on "+PORT);
});