import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import {ApiResponse} from "./utils/ApiResponse.js";
import userRouter from "./routes/user.route.js";

const app = express();

app.use(cors({
    origin:"*",
    credentials:true,
}));

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>{
    res.status(200).json(new ApiResponse(200,{status:"Connected"},"Mealbridge backend server running... "));
})

app.use("/users",userRouter);

export {app}