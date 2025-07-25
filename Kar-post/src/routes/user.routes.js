import {Router} from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js"
const userRoutes= Router();
userRoutes.route("/register").post(userRegister);
userRoutes.route("/login").get(userLogin);
export {userRoutes};