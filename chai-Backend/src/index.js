// This file is the entry point of the application. It is responsible for connecting to the database and starting the server.

// require('dotenv').config({path:'./env'})

// this above code are also acceptable and run but its reduce the consistencies of my code. so we can use import instead of require and export instead of module.exports

import dotenv from "dotenv"
// import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";

dotenv.config({path:'./.env'})

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running at port :${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("MONGO db connection failed !!!",err);
    process.exit(1)
})

// function connectDB(){}
// connectDB()


/*
import express from "express"
( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/{DB_NAME}`)
        app.on("error", (error) =>{
            console.log("ERROR",error);
            throw error
        })

        app.listen(process.env.PORT, () =>{
            console.log(`App is Listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("ERROR",error)
        throw err
    }
})()
*/