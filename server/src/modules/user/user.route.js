import {Router} from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import { clientForgot, clientLogin, clientReset, userRegister, userUpdate } from "../dtos/schemas.js";
import userController from "./user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/check-role.middleware.js";
import multerConfig from "../../configs/multer.config.js";
// JS
const userRoute = Router();
userRoute
 .get("/", 
    authMiddleware.checkAccessToken(true),
    authMiddleware.checkRefreshToken(true),
    checkRole("USER"),
    userController.getUser
 )
 .post("/register",
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    validation(userRegister), 
    userController.register
 )
 .post("/login",
   authMiddleware.checkAccessToken(false),
   authMiddleware.checkRefreshToken(false),
   validation(clientLogin),
   userController.login
 )
 .post("/update",
   authMiddleware.checkAccessToken(true),
   authMiddleware.checkRefreshToken(true),
   checkRole("USER"),
   multerConfig.uploadOnlyImage.single("imageUrl"),
   validation(userUpdate),
   userController.update
 )
 .post("/delete",
   authMiddleware.checkAccessToken(true),
   authMiddleware.checkRefreshToken(true),
   checkRole("USER"),
   userController.deleteUser
 )
 .post("/forgot",
  authMiddleware.checkAccessToken(false),
  authMiddleware.checkRefreshToken(false),
  validation(clientForgot),
  userController.forgotPassword
 )
 .post("/reset",
  authMiddleware.checkAccessToken(false),
  authMiddleware.checkRefreshToken(false),
  validation(clientReset),
  userController.resetPassword
 )
export default userRoute;