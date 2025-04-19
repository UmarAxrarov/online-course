import { isValidObjectId } from "mongoose";
import { requset_errors } from "../../exceptions/requset-errors.js";
import userModel from "../user/user.model.js";
import likeService from "./like.service.js";

// JS
class LikeController {
    #_service;
    constructor() {
        this.#_service = likeService;
    }
    createLike = async (req,res,next) => {
        try {
            const {userId, cursId} = req.query;
            if(!(isValidObjectId(userId) || isValidObjectId(cursId))) {
                throw new requset_errors("user yoki curs id hato berildi", 400, "CONTROLLER");
            }
            const newLike = await this.#_service.createLike(userId,cursId);
            await userModel.findByIdAndUpdate({_id:userId}, {
                $push: {
                    likes: newLike._id,
                }
            })
            res.status(201).send({
                message: "Like yaratildi",
            })
        } catch (error) {
            next(error);
        }
    }
}
export default new LikeController();