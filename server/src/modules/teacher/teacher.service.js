import { count } from "node:console";
import teacherModel from "./teacher.model.js";
// JS
class TeacherService {
    #_service;
    constructor() {
        this.#_service = teacherModel;
    }
    getTeacher = async (id) => {
        const findTeacher = await this.#_service.findOne({_id:id}).select("_id").populate({
            path: "courses",
            select:"tel_number title content fileUrl",
        });
        return findTeacher;
    }
    createTeacher = async (data) => {
        const newTeacher = await this.#_service.create({...data});
        return newTeacher;
    }
    updateTeacher = async (id,data) => {
        const updatedTeacher = await this.#_service.findByIdAndUpdate(
            {_id:id},
            {$set: {...data}},
            {new:true},
        ).select("-_id name email password tel_number");
        return updatedTeacher;
    }
    deleteTeacher = async (id) => {
        await this.#_service.findByIdAndDelete({_id:id});
        return 1;
    }
    findTeacher = async (data) => {
        const teacher = await this.#_service.findOne({
            $or:[{_id:data.id},{email: data.email},{tel_number: data.tel_number}, {token:data.token}],
        });
        return teacher;
    }
}
export default new TeacherService();