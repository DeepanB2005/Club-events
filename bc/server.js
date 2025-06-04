const express =require('express');
const app =express();
const port = 3000;
app.listen(port,(e)=>{
    if(e) {
        console.error("Error starting server:", e);
        return;
    }else{
    console.log(`Server is running on http://localhost:${port}`);
    console.log("vanakkam da mapla")
    }
})