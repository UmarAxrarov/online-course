import { config } from "dotenv";
// JS
config();
export const port = +process.env.PORT || 4000;