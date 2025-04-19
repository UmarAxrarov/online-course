import app from "./app.js";
import { connectDB } from "./configs/database.config.js";
import { port } from "./configs/port.config.js";
// JS
console.log(await connectDB());
const server = app.listen(port,() => {console.log(`Server run on ${port} port`);}); 
process.on("unhandledRejection", (reason,promise) => {
    console.log(reason?.message, "  <-- ERROR");
    server.closeAllConnections();
    server.close(() => process.exit(1));
})