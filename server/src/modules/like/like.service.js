import likeModel from "./like.model.js";
// JS
class LikeService {
    #_service;
    constructor() {
        this.#_service = likeModel;
    }
    createLike = async (userId,cursId) => {
        const newLike = new this.#_service({
            user:userId,
            curs:cursId,
        });
        await newLike.save();
        return {};
    }
    deleteLike = async (id) => {
        await this.#_service.findByIdAndDelete({id});
        return {}
    }
}
export default new LikeService();