import logger from "../configs/winston.config.js";
// JS
function dbDubKeyError(error) {
    if(error.code === 11000) {
        error.status = 409
        error.isException = true;
        error.message = `Ushbu: "${Object.values(error.keyValue).join(", ")}" qiymatga ega foydalanuvchi bor`;
    }
    return error
}
function dbSelectUndefinedError(error) {
    if(error.code === 31254) {
        error.status = 404
        error.isException = true;
        error.message = `Ushbu: "select berilgan paramet databasada mavjud emas"`;
    }
    return error
}
function multerSizeFIleError(error) {
    if(error.code === "LIMIT_FILE_SIZE") {
        error.status = 400
        error.isException = true;
        error.message = `Ushbu mb juda kop`;
    }
    return error
}
export const global_errors_middleware = (error,_,res,__) => {
    logger.logger_error.error(error.message)    
    error = dbDubKeyError(error);
    error = dbSelectUndefinedError(error);
    error = multerSizeFIleError(error);
    if(error.isException) {
        return res.status(error.status).send({
            message: error.message,
            errorType: error.errorType,
        })
    }
    console.log(error);
    return res.status(500).send({
        message: "Server error",
    })
} 