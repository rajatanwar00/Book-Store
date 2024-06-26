import express from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from './models/bookModel.js';
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app=express();

app.use(express.json());

app.use(cors());

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

app.use('/books', booksRoute);


/*
//to save a new book
app.post('/books', async (request,response)=>{
    try{
        if(!request.body.title||!request.body.author||!request.body.publishYear){
            return response.status(400).send({
                message:'Send all required fields'
            });
        }
        const newBook={
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };

        const book= await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch(error){
        console.log(error.message);
        console.status(500).send({message:error.message});
    }
});

//get all books
app.get('/books', async (request,response)=>{
    try{
        const books=await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books,
        });
    }
    catch(error){
        console.log(error.message);
        console.status(500).send({message:error.message});
    }
});

//get book by id
app.get('/books/:id', async (request,response)=>{
    try{
        const {id}=request.params;
        
        const book=await Book.findById(id);
        return response.status(200).json(book);
    }
    catch(error){
        console.log(error.message);
        console.status(500).send({message:error.message});
    }
});

//update book
app.put('/books/:id', async (request,response)=>{
    try{
        if(!request.body.title||!request.body.author||!request.body.publishYear){
            return response.status(400).send({
                message:'Send all required fields'
            });
        }

        const {id}=request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);

        if(!result){
            return response.status(404).json({message:'Book not found'});
        }

        return response.status(200).send({message:'Book updated successfully'});
    }
    catch(error){
        console.log(error.message);
        console.status(500).send({message:error.message});
    }
});

//delete a book
app.delete('/books/:id',async (request,response)=>{
    try{
        const {id}=request.params;
        const result=await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'Book not found'});
        }

        return response.status(200).send({message:'Book updated successfully'});        
    }
    catch(error){
        console.log(error.message);
        console.status(500).send({message:error.message});
    }
});
*/

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