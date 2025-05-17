import MedicationSchedule from "../models/medication_schedule.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

export const createMedication = async (req, res, next) => {
  try {
    const medication = await MedicationSchedule.create(req.body);
    return res
      .status(201)
      .json(new ApiResponse(201, medication, "Schedule created"));
  } catch (error) {
    next(
      new ApiError(500, "Failed to create medication schedule", [error.message])
    );
  }
};

export const getAllMedicationsByUser = async (req, res, next) => {
  try {
    const meds = await MedicationSchedule.find({ user_id: req.params.userId });
    return res.status(200).json(new ApiResponse(200, meds));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch medications", [error.message]));
  }
};

export const getMedicationById = async (req, res, next) => {
  try {
    const med = await MedicationSchedule.findById(req.params.id);
    if (!med) throw new ApiError(404, "Medication not found");
    return res.status(200).json(new ApiResponse(200, med));
  } catch (error) {
    next(error);
  }
};

export const updateMedication = async (req, res, next) => {
  try {
    const updated = await MedicationSchedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) throw new ApiError(404, "Medication not found");
    return res
      .status(200)
      .json(new ApiResponse(200, updated, "Schedule updated"));
  } catch (error) {
    next(error);
  }
};

export const deleteMedication = async (req, res, next) => {
  try {
    const deleted = await MedicationSchedule.findByIdAndDelete(req.params.id);
    if (!deleted) throw new ApiError(404, "Medication not found");
    return res
      .status(200)
      .json(new ApiResponse(200, deleted, "Schedule deleted"));
  } catch (error) {
    next(error);
  }
};
