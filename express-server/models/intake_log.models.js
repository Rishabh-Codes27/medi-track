import mongoose, { Schema } from "mongoose";

const intakeLogSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    med_name: { type: String, required: true },
    image_url: { type: String, required: true },
    taken_at: { type: Date, default: Date.now },
    verified: { type: Boolean, default: false },
    face_match: { type: Boolean, default: false },
    ai_confidence: { type: Number, default: 0 },
    manual_override: { type: Boolean, default: false },
  },
  { timestamps: false }
);

export const IntakeLog = mongoose.model("IntakeLog", intakeLogSchema);
