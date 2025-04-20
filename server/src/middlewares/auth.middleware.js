import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_EXPIRE_TIME,
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRE_TIME,
    REFRESH_TOKEN_SECRET
} from "../configs/jwt.config.js";
import { requset_errors } from "../exceptions/requset-errors.js";

class Auth {
    constructor() {}

    checkAccessToken(isCheck) {
        return (req, _, next) => {
            if (isCheck === false) {
                req.role = "USER";
                return next();
            }
            
            const accessToken = req.cookies.accessToken;
            if (!accessToken) {
                req.role = "USER";
                return next();
            }
            
            try {
                const decodeAceessToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
                req.role = decodeAceessToken.role;
                req.id = decodeAceessToken.id;
                req.isValidAccessToken = true;
                return next();
            } catch (error) {
                if ( error instanceof jwt.TokenExpiredError) {
                    req.isValidAccessToken = false;
                    req.role = "USER"; 
                    return next();
                } else if (error instanceof jwt.NotBeforeError) {
                    req.isValidAccessToken = false;
                    return next(new requset_errors("Hozirchali buyerda amal bajara olmaysiz.", 409,"JWT"));
                } else if (error instanceof jwt.JsonWebTokenError) {
                    req.isValidAccessToken = false;
                    return next(new requset_errors("token hato format yuborildi.", 400,"JWT"));
                }
                return next(error);
            }
        };
    }
    
    checkRefreshToken(isCheck) {
        return (req, res, next) => {
            if (isCheck === false) {
                req.role = "USER";
                return next();
            }
            if (req.isValidAccessToken === true) {
                return next();
            }
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return next(new requset_errors("return login",401,"JWT"));
            }
            try {
                const decodeRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
                const payload = {id:decodeRefreshToken.id,role: decodeRefreshToken.role};
                const newAccessToken = jwt.sign(
                    payload,
                    ACCESS_TOKEN_SECRET,
                    { expiresIn: +ACCESS_TOKEN_EXPIRE_TIME }
                );

                const newRefreshToken = jwt.sign(
                    payload,
                    REFRESH_TOKEN_SECRET,
                    { expiresIn: +REFRESH_TOKEN_EXPIRE_TIME }
                );
                
                res.cookie("accessToken", newAccessToken, {
                    maxAge: +ACCESS_TOKEN_EXPIRE_TIME * 1000,
                    httpOnly: true,
                });
                
                res.cookie("refreshToken", newRefreshToken, {
                    maxAge: +REFRESH_TOKEN_EXPIRE_TIME * 1000,
                    httpOnly: true,
                });
                req.role = decodeRefreshToken.role;
                req.id = decodeRefreshToken.id;
                next();
            } catch (error) {
                if (error instanceof jwt.TokenExpiredError) {
                    return next(new requset_errors("token mudati tugagan qayat login qiling.", 406,"JWT"));
                } else if (error instanceof jwt.NotBeforeError) {
                    return next(new requset_errors("Hozirchali buyerda amal bajara olmaysiz.", 409,"JWT"));
                } else if (error instanceof jwt.JsonWebTokenError) {
                    return next(new requset_errors("token hato format yuborildi.", 400,"JWT"));
                }
                next(error);
            }
        }
    }
}
export default new Auth();