import mongoose, { Schema } from "mongoose";

const prescriptionUploadSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    image_url: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "processed", "error"],
      default: "pending",
    },
    extracted_text: { type: String },
    uploaded_at: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

export const PrescriptionUpload = mongoose.model(
  "PrescriptionUpload",
  prescriptionUploadSchema
);
