import likeModel from "./like.model.js";
// JS
class LikeService {
    #_service;
    constructor() {
        this.#_service = likeModel;
    }
    findLike = async (id) => {
        const findLike = await this.#_service.findById({_id:id});
        return findLike;
    }
    createLike = async (userId,cursId) => {
        const newLike = new this.#_service({
            user:userId,
            curs:cursId,
        });
        await newLike.save();
        return newLike;
    }
    deleteLike = async (id) => {
        await this.#_service.findByIdAndDelete({_id:id});
        return 1;
    }
}
export default new LikeService();