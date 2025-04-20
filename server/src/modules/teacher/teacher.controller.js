import { requset_errors } from "../../exceptions/requset-errors.js";
import courseModel from "../course/course.model.js";
import teacherService from "./teacher.service.js";
import { isValidObjectId } from "mongoose";
import { hash, compare } from "bcrypt";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { 
    ACCESS_TOKEN_EXPIRE_TIME, 
    ACCESS_TOKEN_SECRET, 
    REFRESH_TOKEN_EXPIRE_TIME, 
    REFRESH_TOKEN_SECRET } 
from "../../configs/jwt.config.js";
import { sendGmail } from "../../utils/email.util.js"; 
// JS
class TeacherController {
    #_service;
    constructor() {
        this.#_service = teacherService;
    }
    getTeacher = async (req,res,next) => {
            try {
                const id = req.id;
                if(!isValidObjectId(id)) {
                    throw new requset_errors("id hato berild",400, "CONTROLLER");
                }
                const teacher = await this.#_service.getTeacher(id);
                if(!teacher) {
                    throw new requset_errors("teacher topilmadi",404, "CONTROLLER");
                }
                res.status(200).send({
                    message: "Success ✅",
                    data: teacher,
                })
            } catch (error) {
                next(error);
            }
    }
    register = async (req,res,next) => {
        try {
            const {name,email,tel_number} = req.body;
            let {password} = req.body;
            const findTeacher = await this.#_service.findTeacher({email,tel_number});
            const token = crypto.randomBytes(20).toString("hex");
            if(findTeacher) {
                throw new requset_errors("munaqa foydalanuvhci bor",409, "CONTROLLER");
            }
            password = await hash(password,5);
            const data = {
              name,
              email,
              password,
              tel_number,
              token 
            }
            const newTeacher = await this.#_service.createTeacher(data);
            const accessToken = jwt.sign({id:newTeacher._id,role:newTeacher.role}, ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
            })
            const refreshToken = jwt.sign({id:newTeacher._id,role:newTeacher.role}, REFRESH_TOKEN_SECRET, {
                expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
            })
            res.cookie("accessToken",accessToken);
            res.cookie("refreshToken",refreshToken);
            sendGmail({
                to: email,
                subject: "Welcome",
                text: `Hush kelibsiz ${name}`,
            });
            res.status(201).send({
                message:"Success ✅",
                data: newTeacher,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }
    login = async (req,res,next) => {
        try {
            const {email,password} = req.body;
            const findTeacher = await this.#_service.findTeacher({email});
            if(!findTeacher) {
                throw new requset_errors("email topilmadi",404,"CONTROLLER");
            }
            const compareHashedPassword = await compare(password,findTeacher.password);
            if(!compareHashedPassword) {
                throw new requset_errors("parol hato kiritildi",404,"CONTROLLER");
            }
            const accessToken = jwt.sign({id:findTeacher._id,role:findTeacher.role}, ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
            })
            const refreshToken = jwt.sign({id:findTeacher._id,role:findTeacher.role}, REFRESH_TOKEN_SECRET, {
                expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
            })
            res.cookie("accessToken",accessToken);
            res.cookie("refreshToken",refreshToken);
            res.status(200).send({
                message:"Success ✅",
                data: findTeacher,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }
    update = async (req,res,next) => {
        try {
            const {name} = req.body;
            let {password} = req.body
            const id = req.id;
            const imageUrl = req?.file?.filename;
            if(!isValidObjectId(id)) {
                throw new requset_errors("id hato beildi",400, "CONTROLLER");
            }
            const findTeacher = await this.#_service.findTeacher({_id:id});
            if(!findTeacher) {
                throw new requset_errors("munaqa ustoz yoq",404, "CONTROLLER"); 
            }
            const cheking = {
                name,
                password,
                imageUrl
            };
            const checked = Object.fromEntries(
                Object.entries(cheking).filter(([_, value]) => value !== undefined)
            );
            checked.password = await hash(checked.password,5);
            const updatedTeacher = await this.#_service.updateTeacher(id,checked);
            res.status(202).send({
                message: "Success ✅",
                data:updatedTeacher,
            });
        } catch (error) {
            next(error)
        }
    }
    deleteTeacher = async (req,res,next) => {
        try {
            const id = req.id;
            
            if(!isValidObjectId(id)) {
                throw new requset_errors("id hato berild",400, "CONTROLLER");
            }
            const findTeacher = await this.#_service.findTeacher({id});
            if(!findTeacher) {
                throw new requset_errors("munaqa ustoz yoq",404, "CONTROLLER"); 
            }
            await this.#_service.deleteTeacher(id);
            await courseModel.deleteMany({teacher:id});
            res.send(204).end();
        } catch (error) {
            next(error)
        }
    }
    forgotPassword = async (req,res,next) => {
        try {
            const {email} = req.body;
            const findTeacher = await this.#_service.findTeacher({email});
            if(!findTeacher) {
                throw new requset_errors("email topilmadi",404,"CONTROLLER");
            }
            const token = crypto.randomBytes(20).toString("hex");
            findTeacher.token = token;
            await findTeacher.save();
            sendGmail({
                to:email,
                subject: "res password",
                html: `<p>${token}</p>`,
            })
            res.status(200).send({
                message: "email tekshiring",
            });
        } catch (error) {
            next(error);
        }
    }
    resetPassword = async (req,res,next) => {
        try {
            let {password} = req.body;
            const {token} = req.query;
            const findTeacher = await this.#_service.findTeacher({token});
            if(!findTeacher) {
                throw new requset_errors("foydalanuvhci topilmadi",404,"CONTROLLER");
            }
            password = await hash(password,5);
            const resetPassword = await this.#_service.updateTeacher(findTeacher._id,{password});
            res.status(200).send({
                message:"✅ qayata login qiling",
                data: resetPassword,
            })
        } catch (error) {
            next(error);
        }
    }
}
export default new TeacherController();