import {Router} from "express";
import { schedulePost } from "../controllers/post.controller.js";
const postRoutes= Router();
postRoutes.route("/create-post").post(schedulePost)
export {postRoutes}