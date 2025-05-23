import {Router} from "express";
import { validation } from "../../middlewares/validation.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { checkRole } from "../../middlewares/check-role.middleware.js";
import multerConfig from "../../configs/multer.config.js";
import teacherController from "./teacher.controller.js";
import { clientForgot, clientLogin, clientReset, clientUpdate, teacherRegister } from "../dtos/schemas.js";
// JS
const teacherRoute = Router();
teacherRoute
 .get("/", 
    authMiddleware.checkAccessToken(true),
    authMiddleware.checkRefreshToken(true),
    checkRole("TEACHER"),
    teacherController.getTeacher
 )
 .post("/register",
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    validation(teacherRegister), 
    teacherController.register
 )
 .post("/login",
   authMiddleware.checkAccessToken(false),
   authMiddleware.checkRefreshToken(false),
   validation(clientLogin),
   teacherController.login
 )
 .post("/update",
   authMiddleware.checkAccessToken(true),
   authMiddleware.checkRefreshToken(true),
   checkRole("TEACHER"),
   multerConfig.uploadOnlyImage.single("imageUrl"),
   validation(clientUpdate),
   teacherController.update
 )
 .post("/delete",
   authMiddleware.checkAccessToken(true),
   authMiddleware.checkRefreshToken(true),
   checkRole("TEACHER"),
   teacherController.deleteTeacher
 )
 .post("/forgot",
  authMiddleware.checkAccessToken(false),
  authMiddleware.checkRefreshToken(false),
  validation(clientForgot),
  teacherController.forgotPassword
 )
 .post("/reset",
  authMiddleware.checkAccessToken(false),
  authMiddleware.checkRefreshToken(false),
  validation(clientReset),
  teacherController.resetPassword
 )
export default teacherRoute;