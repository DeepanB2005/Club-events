const express =require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app =express();
const port = 3000;
app.listen(port,(e)=>{
    if(e) {
        console.error("Error starting server:", e);
        return;
    }else{
    console.log(`Server is running on http://localhost:${port}`);
    console.log("vanakkam da mapla");
    }
})




const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Connection error:', err));