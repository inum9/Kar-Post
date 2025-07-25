import  {Router} from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { handleLinkedInCallback, redirectToLinkdin } from "../controllers/linkdin.controller.js";
const linkRoutes=Router();

// This route starts the process and needs the user to be logged in
linkRoutes.route('/connect').get(verifyJwt,redirectToLinkdin );

// This is the callback route LinkedIn will redirect to
linkRoutes.route('/callback').get(verifyJwt, handleLinkedInCallback);
export{linkRoutes};
