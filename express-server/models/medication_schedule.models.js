import mongoose, { Schema } from "mongoose";

const medicationScheduleSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    med_name: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true },
    time: { type: String, required: true }, // e.g., "08:00 AM"
    freqency: { type: String, enum: ["daily", "weekly"], required: true }, // daily, weekly, etc.
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    notes: { type: String }
  },
  { timestamps: true }
);

export const MedicationSchedule = mongoose.model(
  "MedicationSchedule",
  medicationScheduleSchema
);
