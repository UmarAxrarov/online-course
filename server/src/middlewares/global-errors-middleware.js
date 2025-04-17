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
export const global_errors_middleware = (error,_,res,__) => {
    logger.logger_error.error(error?.code,error.message)    
    error = dbDubKeyError(error);
    if(error.isException) {
        return res.status(error.status).send({
            message: error.message,
        })
    }
    return res.status(500).send({
        message: "Server error",
    })
} 