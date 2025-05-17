import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

// configurations
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
    console.log("Headers:", req.headers["content-type"]);
    next();
  });

//import routers
import userRoutes from "./routes/user.routes.js";
import medicationRoutes from "./routes/medication.routes.js";
import prescriptionRoutes from "./routes/presecription.routes.js";
import intakeRoutes from "./routes/intake.routes.js";

//declaring routers
app.use("/api/users", userRoutes);
app.use("/api/medications", medicationRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/intakes", intakeRoutes);

export { app };