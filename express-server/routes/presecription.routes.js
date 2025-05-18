import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  uploadPrescription,
  manualPrescription,
  confirmAndSavePrescription,
  getAllPrescriptionsByUser,
  getPrescriptionById,
  updatePrescriptionStatus,
  deletePrescription,
} from "../controllers/prescription.controllers.js";
import fs from "fs";


const router = Router();

const dir = "./public/temp";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
router.post("/", upload.single("prescription"), uploadPrescription);
router.post("/confirm", confirmAndSavePrescription);
router.post("/manual", manualPrescription);
router.get("/user/:userId", getAllPrescriptionsByUser);
router.get("/:id", getPrescriptionById);
router.put("/:id/status", updatePrescriptionStatus);
router.delete("/:id", deletePrescription);

export default router;
