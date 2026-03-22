import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes Import
import userRouter from "./routes/user.routes.js";


// routes declaration
// app.use("/users",userRouter)

// https://localhost:8000/user/register
// https://localhost:8000/user/login

app.use("/api/v1/users", userRouter)

// https://localhost:8000/api/v1/users/register




// export default app;
export { app }