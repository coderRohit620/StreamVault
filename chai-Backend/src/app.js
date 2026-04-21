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
import commentRouter from "./routes/comment.routes.js"
import videoRouter from "./routes/video.routes.js"
import dashRouter from "./routes/dashboard.routes.js"
import healthRouter from "./routes/dashboard.routes.js"
import likeRouter from "./routes/dashboard.routes.js"
import paylistRouter from "./routes/playlist.routes.js"
import subscripRouter from "./routes/dashboard.routes.js"
import tweetRouter from "./routes/dashboard.routes.js"




// routes declaration
// app.use("/users",userRouter)

// https://localhost:8000/user/register
// https://localhost:8000/user/login

app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/dashboard", dashRouter)
app.use("/api/v1/healthcare", healthRouter)
app.use("/api/v1/like", likeRouter)
app.use("/api/v1/playlist", paylistRouter)
app.use("/api/v1/subscription", subscripRouter)
app.use("/api/v1/tweet", tweetRouter)





// https://localhost:8000/api/v1/users/register


// export default app;
export { app }