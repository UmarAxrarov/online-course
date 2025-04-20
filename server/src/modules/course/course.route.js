import {Router} from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import courseController from "./course.controller.js";
import { validation } from "../../middlewares/validation.middleware.js";
import { createCourse } from "../dtos/schemas.js";
import multerConfig from "../../configs/multer.config.js";
// JS
const courseRoute = Router();
courseRoute
 .post("/", 
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    multerConfig.upload.single("fileUrl"),
    validation(createCourse),
    courseController.createCourse
 )
 .post("/delete", 
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    courseController.deleteCourse
 )
 .post("/update", 
    authMiddleware.checkAccessToken(false),
    authMiddleware.checkRefreshToken(false),
    multerConfig.upload.single("fileUrl"),
    courseController.updateCourse
 )
export default courseRoute;