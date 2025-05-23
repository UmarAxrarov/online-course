import Joi from "joi";

export const userRegister = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).max(50).required(),
    email: Joi.string().email().required(), // UNIQUE
}).required();

export const teacherRegister = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().min(6).max(50).required(),
    email: Joi.string().email().required(), // UNIQUE
    tel_number: Joi.string().min(7).max(15).required(), // UNIQUE
}).required();

export const clientUpdate = Joi.object({
    name: Joi.string().min(2).max(30),
    password: Joi.string().min(6).max(50),
    imageUrl: Joi.string(),
}).required();

export const clientLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(50).required(),  
}).required();

export const clientForgot = Joi.object({
    email: Joi.string().email().required(),
}).required();

export const clientReset = Joi.object({
    password: Joi.string().min(6).max(50).required(),
}).required();

export const createCourse = Joi.object({
    fileUrl: Joi.string().required(),
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).max(5000).required(),
    tel_number: Joi.string().min(7).max(15).required(),
}).required();