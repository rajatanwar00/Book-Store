import express from "express";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import booksRoute from "./routes/booksRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from "./models/userModel.js";
import bodyParser from "body-parser";
import authenticateJWT from "./middleware/middleware.js";
import dotenv from 'dotenv';

dotenv.config();

const clientID=process.env.CLIENT_ID;
const client = new OAuth2Client(clientID);
const SECRET_KEY=process.env.JWT_KEY
const PORT=process.env.PORT;
const mongoDBURL=process.env.DB_URL;
const app=express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(authenticateJWT);

/*
app.use(cors({
    origin: 'https://localhost:3000',
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type'],
}))
*/

app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to Book Store");
});

app.post('/login',async (request,response)=>{
    //console.log(request);
    const googleToken=request.body.authToken;
    try{
        
        const ticket=await client.verifyIdToken({
            idToken:googleToken,
            audience:clientID
        });

        const payload = ticket.getPayload();
        console.log("Payload Fetched");
        const {name,email,picture,sub}=payload;

        if(payload.aud===clientID&&payload.iss==='https://accounts.google.com'){
            //store the user in database
            console.log("Valid Google Token");

            const dbUser=await User.findOne({email}).catch(err=>{
                                                        console.log("Error while searching user");
                                                        console.log(err);
                                                        return ;
                                                    })

            if(!dbUser){
                console.log("Creating new user -> ", name);

                const newUser={
                    name,email,picture,subId:sub
                }
                await User.create(newUser)
                    .catch(err=>{
                        console.log("Error while creating new user");
                        console.log(err);
                        return ;
                    })
            }
            else{
                console.log("User already exists -> ",name);
            }

        }
        else{
            //throw error
            console.log("Invalid Google Token");
            res.status(401).json({message:"Unauthorised Login Attempt"});
        }

        const serverToken=jwt.sign({name,email,picture,sub},SECRET_KEY,{expiresIn:'1d'});

        response.status(200).json({serverToken,message:"Authentication Successful"});
    }
    catch(error){
        console.log("GoogleToken Handling Error,", error);
        response.status(401).json({ error: 'Invalid ID token' });
    }
});

app.use('/books', booksRoute);
app.use('/user', userRoute);


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