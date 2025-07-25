import {Router} from "express";
import { userLogin, userRegister } from "../controllers/user.controller.js"
import { verifyJwt } from "../middleware/auth.midlleware.js";
const userRoutes= Router();
userRoutes.route("/register").post(userRegister);
userRoutes.route("/login").get(userLogin);
//secured routes
userRoutes.route("/logout").
export {userRoutes};