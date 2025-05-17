import { Router } from "express";
import {
  saveMedicationSchedule,
  getMedicationSchedule,
  getMedicationById,
  getAllMedicationsByUser,
  updateMedication,
  deleteMedication,
} from "../controllers/medication.controllers.js";

const router = Router();

router.post("/", saveMedicationSchedule);
router.get("/", getMedicationSchedule);  
router.get("/user/:userId", getAllMedicationsByUser);
router.get("/:id", getMedicationById);
router.put("/:id", updateMedication);
router.delete("/:id", deleteMedication);

export default router;
