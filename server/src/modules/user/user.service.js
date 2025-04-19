import userModel from "./user.model.js";
// JS
class UserService {
    #_service;
    constructor() {
        this.#_service = userModel;
    }
    getUser = async (id) => {
        // const findUser = await this.#_service.findById({_id:id}).populate({
        //     path: "likes",
        //     populate: {
        //         path: "curs",
        //     }
        // })
        const findUser = await this.#_service.findById({_id:id}).populate({
            path: "likes",
            select: "-_id user curs",
        })
        return findUser;
    }
    createUser = async (name,email,password) => {
        const newUser = await this.#_service.create({
            name,
            email,
            password
        })
        return newUser;
    }
    updateUser = async (id,data) => {
        const updatedUser = await this.#_service.findByIdAndUpdate(
            {_id:id},
            {$set: {...data}},
            {new: true}
        )
        return updatedUser;
    }
    deleteUser = async (id) => {
        await this.#_service.findByIdAndDelete({_id:id});
        return 1;
    }
    findUser = async (email) => {
        const user = await this.#_service.findOne({email});
        return user;
    }
}
export default new UserService();