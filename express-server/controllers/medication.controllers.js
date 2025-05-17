import { MedicationSchedule } from "../models/medication_schedule.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

// POST /schedule
export const saveMedicationSchedule = async (req, res, next) => {
  try {
    const {
      user_id,
      med_name,
      dosage,
      time,
      frequency,
      start_date,
      end_date,
      notes,
    } = req.body;

    // 1. Validate required fields
    if (
      !user_id ||
      !med_name ||
      !dosage ||
      !time ||
      !frequency ||
      !start_date ||
      !end_date
    ) {
      throw new ApiError(400, "Missing required fields");
    }

    // 2. Ensure valid frequency
    if (!["daily", "weekly"].includes(frequency)) {
      throw new ApiError(400, "Invalid frequency value");
    }

    // 3. Parse start/end dates (string to Date)
    const parsedStartDate = new Date(start_date);
    const parsedEndDate = new Date(end_date);
    if (isNaN(parsedStartDate) || isNaN(parsedEndDate)) {
      throw new ApiError(400, "Invalid date format");
    }

    // 4. Upsert medication schedule (one per user + med_name)
    const saved = await MedicationSchedule.findOneAndUpdate(
      { user_id, med_name },
      {
        dosage,
        time,
        frequency,
        start_date: parsedStartDate,
        end_date: parsedEndDate,
        notes,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(new ApiResponse(200, saved, "Schedule saved"));
  } catch (error) {
    next(new ApiError(500, "Failed to save schedule", [error.message]));
  }
};

// GET /schedule?user_id=xxx&date=2025-05-17
export const getMedicationSchedule = async (req, res, next) => {
  try {
    const { user_id, date } = req.query;

    if (!user_id) {
      throw new ApiError(400, "Missing user_id");
    }

    const filter = { user_id };

    if (date) {
      const parsed = new Date(date);
      if (isNaN(parsed)) throw new ApiError(400, "Invalid date");
      filter.start_date = { $lte: parsed };
      filter.end_date = { $gte: parsed };
    }

    const schedules = await MedicationSchedule.find(filter);
    return res.status(200).json(new ApiResponse(200, schedules));
  } catch (error) {
    next(new ApiError(500, "Failed to fetch schedule", [error.message]));
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
