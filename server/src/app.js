import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import {config} from "dotenv";
import { global_errors_middleware } from "./middlewares/global-errors-middleware.js";
import { requset_errors } from "./exceptions/requset-errors.js";
import {join} from "node:path";
// JS
config();
const app = express();
app.use(cors({
    origin: process.env.CORS,
}));
if(process.env.NODE_ENV.trim() === "development") {
    app.use(morgan("tiny"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/uploads", express.static(join(process.cwd(), "uploads")));
app.all("/*splat", (req,_,next) => {
    next(new requset_errors(`Bunday ${req.url} sorov mavjud emas`,404));
})
app.use(global_errors_middleware);
export default app;