import  connectDB  from "./db/index";
import app from "./app";
import express from "express";
import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT;

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Port running on : http://localhost:${PORT}`)
    });
})
.catch((err)=>{
    console.log("ERRoR",err)
});


