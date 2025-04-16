import app from "./app.js";
import { port } from "./configs/port.config.js";
// JS
const server = app.listen(port,() => {console.log(`Server run on ${port} port`);}); 
process.on("unhandledRejection", (reason,promise) => {
    console.log(reason?.message, "  <-- ERROR");
    server.closeAllConnections();
    server.close(() => process.exit(1));
})