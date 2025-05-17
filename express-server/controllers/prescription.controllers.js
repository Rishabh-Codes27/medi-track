import axios from "axios";
import fs from "fs";
import path from "path";
import { PrescriptionUpload } from "../models/prescription_upload.models.js";
import { MedicationSchedule } from "../models/medication_schedule.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const uploadPrescription = async (req, res, next) => {
  try {
    // 1. Check if file is provided
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const localFilePath = path.resolve(req.file.path);

    // 2. Call FastAPI OCR service
    const fastApiResponse = await axios.post(
      "http://localhost:8000/process-document/",
      { file_path: localFilePath }
    );

    //TODO: change it according to fastapi server responsefrequency
    const ocrData = fastApiResponse?.data?.result;

    if (!ocrData) {
      throw new ApiError(500, "OCR failed or no result returned from FastAPI");
    }

    // 3. Send OCR result to frontend for confirmation
    return res
      .status(200)
      .json(new ApiResponse(200, { ocrData }, "Confirm OCR data on frontend"));

    // ⚠️ The next step of saving to DB should be done in a second endpoint (after frontend confirms OCR data)
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path); // Clean up temp file if something fails
    }
    next(error);
  }
};

export const confirmAndSavePrescription = async (req, res, next) => {
  try {
    const { user_id, medi_name, dosage, frequency, duration, notes, fileName } =
      req.body;

    // 1. Validation
    if (!user_id || !medi_name || !duration) {
      throw new ApiError(400, "Missing required fields");
    }

    const tempPath = path.join("./public/temp", fileName);

    if (!fs.existsSync(tempPath)) {
      throw new ApiError(400, "Temp file not found on server");
    }

    // 2. Upload to Cloudinary
    const cloudinaryRes = await uploadOnCloudinary(tempPath);

    if (!cloudinaryRes?.secure_url) {
      throw new ApiError(500, "Upload to Cloudinary failed");
    }

    // Calculate start_date and end_date
    const start_date = new Date();
    const end_date = new Date(
      start_date.getTime() + parseInt(duration) * 24 * 60 * 60 * 1000
    );

    // 3. Save prescription entry to MongoDB
    const savedMedication = await MedicationSchedule.create({
      user_id,
      medi_name,
      dosage,
      frequency,
      start_date,
      notes,
      end_date,
      time,
      file_url: cloudinaryRes.secure_url,
    });

    if (!savedMedication) {
      throw new ApiError(500, "creation of medication scheduling failed");
    }

    const savedPrescription = await PrescriptionUpload.create({
      user_id,
      image_url: cloudinaryRes.secure_url,
      status: "processed",
    });

    if (!savedPrescription) {
      throw new ApiError(500, "creation of prescription failed");
    }

    return res.status(201).json(
      new ApiResponse(
        201,
        {
          saved_medication: savedMedication,
          saved_prescription: savedPrescription,
        },
        "Prescription and medication saved"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const manualPrescription = async (req, res, next) => {
  try {
    const {
      user_id,
      medi_name,
      dosage,
      frequency,
      start_date,
      end_date,
      notes,
      time,
    } = req.body;

    // 1. Validation
    if (
      !user_id ||
      !medi_name ||
      !dosage ||
      !frequency ||
      !start_date ||
      !time ||
      !end_date
    ) {
      throw new ApiError(400, "Missing required fields");
    }

    // 2. Save medication entry directly
    const savedMedication = await MedicationSchedule.create({
      user_id,
      medi_name,
      dosage,
      recurrence,
      start_date,
      end_date,
      notes,
      time,
    });

    if (!savedMedication) {
      throw new ApiError(500, "Failed to create medication schedule");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, { savedMedication }, "Manual prescription saved")
      );
  } catch (error) {
    next(error);
  }
};

export const getAllPrescriptionsByUser = async (req, res, next) => {
  try {
    if(!req.params.userId){
      throw new ApiError(400,"user id required")
    }
    const results = await PrescriptionUpload.find({
      user_id: req.params.userId,
    });
    return res.status(200).json(new ApiResponse(200, results));
  } catch (error) {
    next(error);
  }
};

export const getPrescriptionById = async (req, res, next) => {
  try {
    const result = await PrescriptionUpload.findById(req.params.id);
    if (!result) throw new ApiError(404, "Prescription not found");
    return res.status(200).json(new ApiResponse(200, result));
  } catch (error) {
    next(error);
  }
};

export const updatePrescriptionStatus = async (req, res, next) => {
  try {
    const updated = await PrescriptionUpload.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updated) throw new ApiError(404, "Prescription not found");
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Status updated"));
  } catch (error) {
    next(error);
  }
};

export const deletePrescription = async (req, res, next) => {
  try {
    const deleted = await PrescriptionUpload.findByIdAndDelete(req.params.id);
    if (!deleted) throw new ApiError(404, "Prescription not found");
    return res
      .status(200)
      .json(new ApiResponse(200, deleted, "Prescription deleted"));
  } catch (error) {
    next(error);
  }
};
