import mongoose from "mongoose";
import { DB_NAME } from "./constants";
// 

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