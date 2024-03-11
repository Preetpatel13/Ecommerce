import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path: './.env'
});

// Call connectDB and handle the promise using .then() and .catch()
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Something went wrong. MongoDB connection failed: " + err.message);
  });
