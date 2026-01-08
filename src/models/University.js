import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: String,
  type: String,
  website: String,
  description: String,
  image: String,
}, { timestamps: true });

export default mongoose.models.University ||
 mongoose.model("University", UniversitySchema);