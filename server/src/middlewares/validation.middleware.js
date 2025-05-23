import { requset_errors } from "../exceptions/requset-errors.js";
// JS
export const validation = (schema) => {
    
    return (req,_,next) => {
        try {
            if(req.file) {
                req.body.fileUrl = req?.file?.filename;
            }
            const {error,value} = schema.validate(req.body);
            if(error) {
                throw new requset_errors(error.message, 400, "VALIDATION");
            }
            req.body = value;
            next();
        } catch (error) {
            next(error);
        }
    }
}