import express from "express";
import cookieParser from 'cookie-parser';
const  app =express();

app.use(express.json()); // ✅ Important for reading req.body
app.use(express.urlencoded({ extended: true })); // optional: for form submissions
app.use(cookieParser()); 

import  {userRoutes} from "../src/routes/user.routes.js";
import { linkRoutes  } from "./routes/linkedin.routes.js";
app.use("/api/v1/linkedin",linkRoutes);
app.use("/api/v1/user",userRoutes)
export {app};