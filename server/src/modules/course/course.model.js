import mongoose from "mongoose";
// JS
const courseSchema = new mongoose.Schema({
    teacher: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "Teacher",
        required: true,
    },
    fileUrl: {
        type: mongoose.SchemaTypes.String,
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    tel_number: {        
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    count: {
        type: mongoose.SchemaTypes.Number,
        default: 0,
    }
}, {
    collection: "courses",
    timestamps: true,
    versionKey: false,
})
export default mongoose.model("Course", courseSchema);