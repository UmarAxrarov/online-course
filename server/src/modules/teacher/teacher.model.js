import mongoose from "mongoose";
// JS
const teacherSchema = new mongoose.Schema({
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
    tel_number:{
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: mongoose.SchemaTypes.String,
        default: `http://localhost:${port}/server/uploads/images/dafault-client-img.avif`,
    },
    role: {
        type: mongoose.SchemaTypes.String,
        enum: [ROLES.USER,ROLES.TEACHER,ROLES.ADMIN],
        default: ROLES.TEACHER,
    },
    courses: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Course",
    }]
}, {
    collection: "teachers",
    timestamps: true,
    versionKey: false,
})
export default mongoose.model("Teacher", teacherSchema);