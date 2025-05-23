import winston from "winston";
import path from "path";
// JS
const logDir = path.join(process.cwd(),"logs");
const logger_error = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
        winston.format.json()
    ),
    transports: [
        // new winston.transports.Console({ level: "error"}),
        new winston.transports.File({ filename: path.join(logDir, "errors.log")}),
    ]
});
const logger_warn = winston.createLogger({
    level: "warn",
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: "warn"}),
        new winston.transports.File({ filename: path.join(logDir, "warnings.log"), level: "warn" }),
    ]
});
const logger_info = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD HH:mm:ss" }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ level: "info"}),
        new winston.transports.File({ filename: path.join(logDir, "info.log") })
    ]
});

export default { logger_error,logger_warn,logger_info };
