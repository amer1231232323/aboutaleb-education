import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'University name is required'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    tuition: {
      type: String,
      trim: true,
    },
    programs: {
      type: [String],
      default: [],
    },
    language: {
      type: String,
      trim: true,
    },
  }, 
  { 
    timestamps: true,
    collection: 'universities'
  }
);

// Prevent model recompilation during hot reload
export default mongoose.models.University || mongoose.model("University", UniversitySchema);
