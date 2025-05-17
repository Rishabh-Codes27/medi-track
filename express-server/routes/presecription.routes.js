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

const router = Router();

router.post("/", upload.single("file"), uploadPrescription);
router.post("/confirm", confirmAndSavePrescription);
router.post("/manual", manualPrescription);
router.get("/user/:userId", getAllPrescriptionsByUser);
router.get("/:id", getPrescriptionById);
router.put("/:id/status", updatePrescriptionStatus);
router.delete("/:id", deletePrescription);

export default router;
