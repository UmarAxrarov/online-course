import multer from "multer";
import {join} from "node:path";
import { requset_errors } from "../exceptions/requset-errors.js";
// JS
let uploadsFile = join(process.cwd(), "uploads");
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        // console.log(true);
        // console.log(join(process.cwd(),"uploads", "images"))
        if(file.mimetype.split("/")[0] === "image") {
            uploadsFile = join(process.cwd(),"uploads", "images");
        }
        if(file.mimetype.split("/")[0] === "video") {
            uploadsFile = join(process.cwd(),"uploads", "videos");
        }
        cb(null,uploadsFile)
    },
    filename: (req,file,cb) => {
        cb(null,Date.now() +  file.originalname.split(".")[0] + "." +  file.mimetype.split("/")[1]);
    }
})
function fileFilterImage(req,file,cb) {
    if(!file.mimetype.startsWith("image/")) {
        return cb(new requset_errors("Faqat Rasm yuklash mumkun", 400,"MULTER"));
    }
    cb(null,true);
}
function fileFilter(req,file,cb) {
    if(!(file.mimetype.startsWith("image/")  || file.mimetype.startsWith("video/"))) {
        return cb(new requset_errors("Faqat Rasm yoki video yuklash mumkun", 400,"MULTER"));
    }
    cb(null,true);
}
const uploadOnlyImage = multer({storage,fileFilter:fileFilterImage, limits:{fileSize: 2 * 1024 * 1024}});
const upload = multer({storage,fileFilter, limits:{fileSize: 10 * 1024 * 1024}});
export default {uploadOnlyImage, upload};
