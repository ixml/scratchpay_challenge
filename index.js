const express = require("express");
const config = require('./config.json');
const clinic = require("./routes/clinic");
const errorHandler = require("./middlewares/error-handler");

const app = express();

//set base API route
const baseRoute = "/api/v1";

///use clinic route 
app.use(baseRoute+'/clinic', clinic);

///global error handler
app.use(errorHandler);

app.listen(config.port,(err)=>{

    if(err){
        console.log(err);
    }
    console.log("Server started at "+ config.port )
});