import express from "express";

const  app =express();

app.use(express.json()); // ✅ Important for reading req.body
app.use(express.urlencoded({ extended: true })); // optional: for form submissions

import  {userRoutes} from "../src/routes/user.routes.js";
app.use("/api/v1/user",userRoutes)
export {app};