import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    clerk_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
