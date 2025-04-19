import courseModel from "./course.model.js"
// JS
class CourseService {
    #_service;
    constructor() {
        this.#_service = courseModel;
    }
    createCourse = async (teacher_id,fileUrl,title,content,tel_number) => {
        const newCourse = new this.#_service({
            teacher: teacher_id,
            fileUrl,
            title,
            content,
            tel_number
        })
        await newCourse.save();
        return {
            newCourse,
        }
    }
    updateCourse = async (id,fileUrl,title,content,tel_number,count) => {
        const updatedCourse = await this.#_service.findByIdAndUpdate({_id:id},{
            $set: {fileUrl,title,content,tel_number,count}
        }, {new: true});
        return {
            updatedCourse,
        }
    }
    deleteCourse = async (id) => {
        await this.#_service.findByIdAndDelete({id});
        return {};
    }
}
export default new CourseService();