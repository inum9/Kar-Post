import express from "express";

const  app =express();

app.use(express.json()); // ✅ Important for reading req.body
app.use(express.urlencoded({ extended: true })); // optional: for form submissions

export {app};