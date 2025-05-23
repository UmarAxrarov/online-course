import { config } from "dotenv";
import { transporter } from "../configs/email.config.js";
import logger from "../configs/winston.config.js";
// JS
config();
export const sendGmail = async ({to,subject,text = "",html = ""}) => {
    try {
        const gmail = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to,
            subject,
            text,
            html,
        })
        return gmail.messageId;
    } catch (error) {
        logger.logger_error.error(error.message)
        throw new Error(`email hoatolik ${error.message} - ERROR`);
    }
}