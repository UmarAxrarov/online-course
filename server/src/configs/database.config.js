import { config } from "dotenv";
import mongoose from "mongoose";
// JS
config();
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        return "database connected ✅🗿";
    } catch (error) {
        console.log("database connect - ERROR", error.message);
        process.exit(1);
    }
}