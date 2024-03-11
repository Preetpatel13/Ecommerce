import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app= express();

app.use(cors({
    origin: 'http://127.0.0.1:3000' // Change this to your frontend origin
  ,credentials: true}));
      app.use(express.json())
    app.use(express.urlencoded())
    app.use(express.static("public"))
    app.use(cookieParser())

//writing router 

import userRouter from './routes/user.routes.js'

app.use("/user",userRouter)
console.log("preet")
export {app}