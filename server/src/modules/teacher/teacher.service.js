import teacherModel from "./teacher.model.js";
// JS
class TeacherService {
    #_service;
    constructor() {
        this.#_service = teacherModel;
    }
    getAllTeacher = async (sortY,limit,page) => {
        const teachers = await this.#_service.find().populate({
            path: "courses",
            options: {
                sort: {count: sortY},
                skip: (page -1) * limit, 
                limit: limit,
            }
        })
        return {
            teachers,
        }
    }
    getTeacher = async (id) => {
        const findTeacher = await this.#_service.findOne({id}).populate("courses");
        return {
            findTeacher,
        }
    }
    createTeacher = async (name,email,password,tel_number) => {
        const newTeacher = await this.#_service.create({
            name,
            email,
            password,
            tel_number
        })
        return {
            newTeacher,
        }
    }
    updateTeacher = async (id,name,email,password,imageUrl,tel_number) => {
        const updatedTeacher = await this.#_service.findByIdAndUpdate(
            {_id:id},
            {$set: {name,email,password,imageUrl,tel_number}},
            {new:true},
        )
        return {
            updatedTeacher,
        }
    }
    deleteUser = async (id) => {
        await this.#_service.findByIdAndDelete({id});
        return {};
    }
}