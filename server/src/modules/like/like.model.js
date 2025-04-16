import mongoose from "mongoose";
// JS
const likeSchema = new mongoose.Schema({
    user: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
    },
    curs: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "Course",
        required: true,
    }
})
export default mongoose.model("Like", likeSchema);
