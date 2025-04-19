import { ROLES } from "../constants/role.constant.js";
import { requset_errors } from "../exceptions/requset-errors.js";
// JS
export const checkRole = (role) => {
    return (req,_,next) => {
        try {        
            const clinet_role = req.role;
            if(!Object.values(ROLES).includes(clinet_role)) {
                throw new requset_errors("register yoki login qiling",404, "ROLE");
            }
            if(clinet_role !== role) {
                throw new requset_errors("bu amalni bajarishga haqingiz yoq",403,"ROLE");
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}
