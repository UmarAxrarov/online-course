import mongoose from "mongoose";
import { ROLES } from "../../constants/role.constant.js";
import port from "../../configs/port.config.js"
// JS
const userSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required:true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imageUrl: {
        type: mongoose.SchemaTypes.String,
        default: `http://localhost:${port}/uploads/images/dafault-client-img.avif`,
    },
    role: {
        type: mongoose.SchemaTypes.String,
        enum: [ROLES.USER,ROLES.TEACHER,ROLES.ADMIN],
        default: ROLES.USER,
    },
    likes: {
        type: mongoose.SchemaTypes.Array,
        ref: "Like"
    }
}, {
    collection: "users",
    timestamps: true,
    versionKey: false
})
export default mongoose.model("User", userSchema);