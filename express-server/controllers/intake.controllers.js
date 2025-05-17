import IntakeLog from "../models/intake_log.models.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

export const logIntake = async (req, res, next) => {
  try {
    const log = await IntakeLog.create(req.body);
    return res.status(201).json(new ApiResponse(201, log, "Intake logged"));
  } catch (error) {
    next(new ApiError(500, "Failed to log intake", [error.message]));
  }
};

export const getAllIntakesByUser = async (req, res, next) => {
  try {
    const logs = await IntakeLog.find({ user_id: req.params.userId });
    return res.status(200).json(new ApiResponse(200, logs));
  } catch (error) {
    next(error);
  }
};

export const getIntakeById = async (req, res, next) => {
  try {
    const log = await IntakeLog.findById(req.params.id);
    if (!log) throw new ApiError(404, "Intake log not found");
    return res.status(200).json(new ApiResponse(200, log));
  } catch (error) {
    next(error);
  }
};

export const updateIntakeVerification = async (req, res, next) => {
  try {
    const updated = await IntakeLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) throw new ApiError(404, "Intake log not found");
    return res.status(200).json(new ApiResponse(200, updated, "Intake updated"));
  } catch (error) {
    next(error);
  }
};

export const deleteIntakeLog = async (req, res, next) => {
  try {
    const deleted = await IntakeLog.findByIdAndDelete(req.params.id);
    if (!deleted) throw new ApiError(404, "Intake log not found");
    return res.status(200).json(new ApiResponse(200, deleted, "Intake log deleted"));
  } catch (error) {
    next(error);
  }
};
