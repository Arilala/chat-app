import express from "express"
import cookieParser from "cookie-parser";
import logger from "./logger/logger.js";




import httpLogger from "./middlewares/http.middlewares.js"
import path from "path";
import connectToMongoDB from "./db/connectToMongoDB.js"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import 'dotenv/config'
import {app,server} from "./socket/socket.js"


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname,"frontend/dist")))
app.use(httpLogger)
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes)
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend", "dist", "index.html"))
});

//const spinner = ora('Loading .....').start();

server.listen(PORT,async ()=>{
    await connectToMongoDB();
    logger.info(`Server Running on  http://localhost:${PORT}`)
})