import Joi from "joi";
// JS
export const userRegister = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(), // UNIQUE
}).required();
export const userUpdate = Joi.object({
    name: Joi.string(),
    password: Joi.string(),
    imageUrl: Joi.string(),
}).required();

export const teacherRegister = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(), // UNIQUE
    tel_number: Joi.string().required(), // UNIQUE
}).required();

export const clientLogin = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),  
}).required();

export const filter = Joi.object({
    sortY: Joi.number().valid(0,1).default(0),
    limit: Joi.number().default(10),
    page: Joi.number().default(1),
})