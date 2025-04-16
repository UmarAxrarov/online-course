import userModel from "./user.model.js";
// JS
class User {
    #_service;
    constructor() {
        this.#_service = userModel;
    }
    getUser = async (id) => {
        const user = await this.#_service.findById({id}).populate("likes");
        return {
            user,
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
    updateUser
}