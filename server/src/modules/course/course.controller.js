import { isValidObjectId } from "mongoose";
import teacherModel from "../teacher/teacher.model.js";
import courseService from "./course.service.js";
import { requset_errors } from "../../exceptions/requset-errors.js";
import { join } from "node:path";
import fs from "node:fs";
import userModel from "../user/user.model.js";
// JS
class CourseController {
    #_service;
    constructor() {
        this.#_service = courseService;
    }
    gtAllCourse = async (req,res,next) => {
        try {
            let {sortColumn,sortY,page, limit} = req.query;
            const chekingSortColumn = ["count"];
            if(!chekingSortColumn.includes(sortColumn)) {
                throw new requset_errors("sortColumn  yoki berilmadi hato berildi",400, "CONTROLLER");
            }
            sortY = Number(sortY);
            page = Number(page);
            limit = Number(limit);
            if(isNaN(page) || isNaN(limit) || isNaN(sortY)) {
                throw new requset_errors("page limit sortY raqam berilmadi",400, "CONTROLLER");
            }
            if (![1, -1].includes(sortY)) {
                throw new requset_errors("sortY 1 yoki -1", 400, "CONTROLLER");
            }
            const courses = await this.#_service.getAllCourses(sortColumn,sortY,page,limit);
            if(!courses) {
                throw new requset_errors("ERROR COURSES",400, "CONTROLLER");
            }
            res.status(200).send({
                data:courses,
            });
        } catch (error) {
            next(error)   
        }
    }
    createCourse = async (req,res,next) => {
        try {
            const { teacher_id } = req.query;
            const { title, content,tel_number } = req.body
            const fileUrl = `${req.file.mimetype.split("/")[0]}s/${req?.file?.filename}`;
            if(!isValidObjectId(teacher_id)) {
                throw new requset_errors("id hato beildi",400, "CONTROLLER");
            }
            const findTeacher = await teacherModel.findById(teacher_id);
            if(!findTeacher) {
                throw new requset_errors("topilmadi hato beildi",400, "CONTROLLER");
            }
            const data = {
                teacher:teacher_id,
                fileUrl,
                title,
                content,
                tel_number
            }
            const newCourse = await this.#_service.createCourse(data);
            await teacherModel.findByIdAndUpdate(teacher_id, {
                $push:{ 
                    courses: newCourse._id,
                }
            })
            res.status(201).send({
                message: "Success ✅",
                data: newCourse,
            })
        } catch (error) {
            next(error);
        }
    }
    deleteCourse = async (req, res, next) => {
        try {
            const { curs_id } = req.query;
            if (!isValidObjectId(curs_id)) {
                throw new requset_errors("id noto'g'ri berildi", 400, "CONTROLLER");
            }
            const findCourse = await this.#_service.findCourse(curs_id);
            if (!findCourse) {
                throw new requset_errors("Kurs topilmadi", 404, "CONTROLLER");
            }
            const image = join(process.cwd(),"uploads",findCourse.fileUrl);
            console.log("TTT",image);
            if (fs.existsSync(image)) {
                fs.unlinkSync(image);
            }
            await this.#_service.deleteCourse(curs_id);
            await teacherModel.findByIdAndUpdate(findCourse.teacher, {
                $pull: {
                    courses: curs_id,
                },
            });
            res.status(200).send({
                message: "Kurs muvaffaqiyatli o'chirildi",
            });
        } catch (error) {
            next(error);
        }
    }
    updateCourse = async (req,res,next) => {
        try {
            const {curs_id} = req.query;
            const {title,content,tel_number} = req.body;
            const fileUrl = `${req.file.mimetype.split("/")[0]}${req?.file?.filename}`;

            const findCurs = await this.#_service.findCourse(curs_id);
            if (!isValidObjectId(curs_id)) {
                throw new requset_errors("id noto'g'ri berildi", 400, "CONTROLLER");
            }
            if(!findCurs) {
                throw new requset_errors("Kurs topilmadi", 404, "CONTROLLER");
            }
            const cheking = {
                fileUrl,
                title,
                content,
                tel_number,
            };
            const checked = Object.fromEntries(
                Object.entries(cheking).filter(([_, value]) => value !== undefined)
            );
            const updatedCourse = await this.#_service.updateCourse(curs_id,checked);
            res.status(200).send({
                message: "Success ✅",
                data:updatedCourse,
            });
        } catch (error) {
            next(error)
        }
    }
}
export default new CourseController();