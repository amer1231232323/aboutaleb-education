import mongoose from "mongoose";

const UniversitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String, // رابط الصورة (هنظبطه بعدين)
    },
  },
  { timestamps: true }
);

export default mongoose.models.University ||
  mongoose.model("University", UniversitySchema);