import { isValidObjectId } from "mongoose";
import { requset_errors } from "../../exceptions/requset-errors.js";
import userModel from "../user/user.model.js";
import likeService from "./like.service.js";
import courseModel from "../course/course.model.js";

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
            const findUser = await userModel.findById({_id:userId});
            const findCourse = await courseModel.findById({_id:cursId});
            if(!findCourse || !findUser) {
                throw new requset_errors("user yoki curs berildi", 404, "CONTROLLER");
            }
            const newLike = await this.#_service.createLike(userId,cursId);
            await userModel.findByIdAndUpdate({_id:userId}, {
                $push: {
                    likes: newLike._id,
                }
            })
            findCourse.count += 1;
            await findCourse.save();
            res.status(201).send({
                message: "Like yaratildi",
            })
        } catch (error) {
            next(error);
        }
    }
    unLike = async (req, res, next) => {
        try {
            const { like_id } = req.query;
            const findLike = await this.#_service.findLike(like_id);
            const findUser = await userModel.findById(findLike.user);
            const findCourse = await courseModel.findById(findLike.curs);
            if(!findCourse || !findUser) {
                throw new requset_errors("user yoki curs berildi", 404, "CONTROLLER");
            }
            if (!findLike) {
                throw new requset_errors("Like topilmadi", 400, "CONTROLLER");
            }
            await this.#_service.deleteLike(id);
            await userModel.findByIdAndUpdate(findLike.user, {
                $pull: {
                    likes: id,
                },
            });
            findCourse.count -= 1;
            await findCourse.save();
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}
export default new LikeController();