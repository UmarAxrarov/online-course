import userModel from "./user.model.js";
// JS
class UserService {
    #_service;
    constructor() {
        this.#_service = userModel;
    }
    getUser = async (id) => {
        const findUser = await this.#_service.findById(id).populate({
            path: "likes",
            populate: {
                path: "curs",
                select: "-_id title content tel_number",
                populate: {
                    path: "teacher",
                    select: "-_id name"
                }
            }
        })
        // const findUser = await this.#_service.findById({_id:id}).populate({
        //     path: "likes",
        //     select: "-_id user curs",
        // })
        return findUser;
    } // for home
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
        ).select("-_id name email password")
        return updatedUser;
    }
    deleteUser = async (id) => {
        await this.#_service.findByIdAndDelete({_id:id});
        return 1;
    }
    findUser = async (data) => {
        const user = await this.#_service.findOne({...data});
        return user;
    }
}
export default new UserService();