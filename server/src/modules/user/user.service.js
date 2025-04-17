import userModel from "./user.model.js";
// JS
class UserService {
    #_service;
    constructor() {
        this.#_service = userModel;
    }
    getUser = async (id) => {
        const findUser = await this.#_service.findOne({id}).populate("likes");
        return {
            findUser,
        }
    }
    createUser = async (name,email,hashPassword) => {
        const newUser = await this.#_service.create({
            name,
            email,
            password:hashPassword
        })
        return {
            newUser,
        }
    }
    updateUser = async (name,email,password,imageUrl) => {
        const updatedUser = await this.#_service.findByIdAndUpdate(
            {name},
            {$set: {email,password,imageUrl}},
        )
        return {
            updatedUser,
        }
    }
    deleteUser = async (id) => {
        await this.#_service.findByIdAndDelete({id});
        return {};
    }
}
export default new UserService();