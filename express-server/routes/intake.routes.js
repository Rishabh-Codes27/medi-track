import { Router } from "express";
import {
  logIntake,
  getIntakeById,
  getAllIntakesByUser,
  updateIntakeVerification,
  deleteIntakeLog,
} from "../controllers/intake.controllers.js";

const router = Router();

router.post("/", logIntake);
router.get("/user/:userId", getAllIntakesByUser);
router.get("/:id", getIntakeById);
router.put("/:id/verify", updateIntakeVerification);
router.delete("/:id", deleteIntakeLog);

export default router;
