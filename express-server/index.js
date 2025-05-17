import { app } from "./app.js";
import connectDB from "./config/db.config.js";

connectDB()
.then(() => {
    app.listen(process.env.PORT_EXPRESS, () => {
        console.log("server is running at port : ",process.env.PORT_EXPRESS);
    })
})
.catch((error)=> {
    console.log("DB connection error : ",error);
})