import nodemailer from "nodemailer";
import {config} from "dotenv";
// JS
config();
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
})