import express from "express"
import dotenv from "dotenv"
import { connectToDb } from "./DB/connectToDb.js";
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";

const app = express();
dotenv.config()

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());

// routes
app.use("/api/v1/user",userRouter);


app.listen(process.env.PORT,()=>{
    console.log("server running ",process.env.PORT);
    connectToDb()
})