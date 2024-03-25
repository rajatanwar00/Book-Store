import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";

const app=express();

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to Book Store");
});

//to save a new book
app.post('/books',(request,response)=>{
    
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("App is connected to Database");
        app.listen(PORT,()=>{
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error)=>{
        console.log(error);
    });