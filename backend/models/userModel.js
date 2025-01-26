import mongoose from "mongoose";

const userSchema= mongoose.Schema(
    {
        
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique: true,
        },
        picture:{
            type:String,
            required:true,
        },
        subId:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true,
    }
);

export const User=mongoose.model('User',userSchema);