import express from "express";


const  app =express();

app.use(express.json()); // ✅ Important for reading req.body
app.use(express.urlencoded({ extended: true })); // optional: for form submissions

import  {userRoutes} from "../src/routes/user.routes.js";
import { linkRoutes  } from "./routes/linkdin.routes.js";
app.use("api/v1/linkdin",linkRoutes);
app.use("/api/v1/user",userRoutes)
export {app};