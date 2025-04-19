import {Router} from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/check-role.middleware.js";
import likeController from "./like.controller.js";
// JS
const likeRoute = Router();
likeRoute
 .post("/", 
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    likeController.createLike
 )
export default likeRoute;