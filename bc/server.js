const express =require('express');
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const clubRoutes = require('./routes/clubs');

connectDB();

const app =express();
const port = 3000;

app.use('/api/users', userRoutes);
app.use('/api/clubs', clubRoutes);

app.listen(port,(e)=>{
    if(e) 
    {
        console.error("Error starting server:", e);
    }
    else
    {    
    console.log();
    console.log(`✨Server is running on http://localhost:${port}`);
    console.log("vanakkam da mapla ☄️❤️‍🔥🧩");
    }
})