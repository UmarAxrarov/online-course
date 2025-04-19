import { isValidObjectId } from "mongoose";
import { hash, compare } from "bcrypt";
import userService from "./user.service.js";
import { requset_errors } from "../../exceptions/requset-errors.js";
import jwt from "jsonwebtoken";
import { 
    ACCESS_TOKEN_EXPIRE_TIME, 
    ACCESS_TOKEN_SECRET, 
    REFRESH_TOKEN_EXPIRE_TIME, 
    REFRESH_TOKEN_SECRET } 
from "../../configs/jwt.config.js";
import { sendGmail } from "../../utils/email.util.js";
import likeModel from "../like/like.model.js";
// JS
class UserController {
    #_service;
    constructor() {
        this.#_service = userService;
    }
    getUser = async (req,res,next) => {
        try {
            const id = req.id;
            if(!isValidObjectId(id)) {
                throw new requset_errors("id hato berild",400, "CONTROLLER");
            }
            const user = await this.#_service.getUser(id);
            if(!user) {
                throw new requset_errors("id hato berild",404, "CONTROLLER");
            }
            res.status(200).send({
                message: "Success ✅",
                data: user,
            })
        } catch (error) {
            next(error);
        }
    }
    register = async (req,res,next) => {
        try {
            const {name,email} = req.body;
            let {password} = req.body;
            const findUser = await this.#_service.findUser(email);
            if(findUser) {
                throw new requset_errors("munaqa foydalanuvhci bor",409, "CONTROLLER");
            }
            password = await hash(password,5);
            const newUser = await this.#_service.createUser(name,email,password);
            const accessToken = jwt.sign({id:newUser._id,role:newUser.role}, ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
            })
            const refreshToken = jwt.sign({id:newUser._id,role:newUser.role}, REFRESH_TOKEN_SECRET, {
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
                data: newUser,
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
            const findUser = await this.#_service.findUser(email);
            if(!findUser) {
                throw new requset_errors("email topilmadi",404,"CONTROLLER");
            }
            const compareHashedPassword = await compare(password,findUser.password);
            if(!compareHashedPassword) {
                throw new requset_errors("parol hato kiritildi",404,"CONTROLLER");
            }
            const accessToken = jwt.sign({id:findUser._id,role:findUser.role}, ACCESS_TOKEN_SECRET, {
                expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
            })
            const refreshToken = jwt.sign({id:findUser._id,role:findUser.role}, REFRESH_TOKEN_SECRET, {
                expiresIn: REFRESH_TOKEN_EXPIRE_TIME,
            })
            res.cookie("accessToken",accessToken);
            res.cookie("refreshToken",refreshToken);
            res.status(200).send({
                message:"Success ✅",
                data: findUser,
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    }
    update = async (req,res,next) => {
        try {
            const {name,password} = req.body;
            const id = req.id;
            const imageUrl = `images/${req.file.filename}`;
            if(!isValidObjectId(id)) {
                throw new requset_errors("id hato beildi",400, "CONTROLLER");
            }
            const cheking = {
                name,
                password,
                imageUrl
            };
            const checked = Object.fromEntries(
                Object.entries(cheking).filter(([_, value]) => value !== undefined)
            );
            const updatedUser = await this.#_service.updateUser(id,checked);
            res.status(202).send({
                message: "Success ✅",
                data:updatedUser,
            });
        } catch (error) {
            next(error)
        }
    }
    deleteUser = async (req,res,next) => {
        try {
            const id = req.id;
            if(!isValidObjectId(id)) {
                throw new requset_errors("id hato berild",400, "CONTROLLER");
            }
            const deletedUser = await this.#_service.deleteUser(id)
            if(!deletedUser) {
                throw new requset_errors("munaqa user yoq",404, "CONTROLLER");
            }
            const likes = await likeModel.find({user:id});
            console.log("likes",likes);
            await likeModel.deleteMany({user:id});
            res.send(204).end();
        } catch (error) {
            next(error)
        }
    }
}
export default new UserController();