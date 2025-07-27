import  {Router} from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { handleLinkedInCallback, redirectToLinkdin ,createLinkdinPost} from "../controllers/linkedin.controller.js";
const linkRoutes=Router();

// This route starts the process and needs the user to be logged in
linkRoutes.route('/connect').get(verifyJwt,redirectToLinkdin );

// This is the callback route LinkedIn will redirect to
linkRoutes.route('/callback').get(verifyJwt, handleLinkedInCallback);

// This route creates a new post on the user's feed.
linkRoutes.route('/post').post(verifyJwt,createLinkdinPost);
export {linkRoutes};
