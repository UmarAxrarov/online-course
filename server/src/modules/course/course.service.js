import courseModel from "./course.model.js";
// JS
class CourseService {
    #_service;
    constructor() {
        this.#_service = courseModel;
    }
    getAllCourses = async (sortColumn, sortY, page, limit) => {
        const courses = await this.#_service.find()
            .sort({ [sortColumn]: sortY })
            .skip((page - 1) * limit)
            .limit(limit)
            .populate({
                path: 'teacher',
                select: '-_id name'
              })              
        return courses;
    };
    
    createCourse = async (data) => {
        const newCourse = new this.#_service({...data})
        await newCourse.save();
        return newCourse;
    }
    updateCourse = async (id,data) => {
        const updatedCourse = await this.#_service.findByIdAndUpdate({_id:id},{
            $set: {...data}
        }, {new: true});
        return updatedCourse;
    }
    deleteCourse = async (id) => {
        await this.#_service.findByIdAndDelete(id);
        return 1;
    }
    findCourse = async (id) => {
        const findCourse = await this.#_service.findById(id);
        return findCourse;
    }
}
export default new CourseService();