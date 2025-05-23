import {Router} from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import likeController from "./like.controller.js";
// JS
const likeRoute = Router();
likeRoute
 .post("/", 
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    likeController.createLike
 )
 .post("/un", 
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    likeController.unLike
 )
export default likeRoute;