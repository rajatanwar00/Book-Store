import express from "express";

const router=express.Router();


router.get('/',(req,res)=>{
    const name=req.user.name;
    const picture=req.user.picture;
    const userObject={name,picture};

    res.status(201).send(userObject);
})

export default router;