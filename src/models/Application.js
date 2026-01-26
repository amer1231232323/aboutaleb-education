import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student ID is required'],
      index: true,
    },

    universityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University',
      required: [true, 'University ID is required'],
      index: true,
    },

    universityName: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "missing_documents"],
      default: "pending",
      index: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { 
    timestamps: true,
    collection: 'applications'
  }
);

// Compound index for faster queries
ApplicationSchema.index({ studentId: 1, universityId: 1 });

// Prevent model recompilation during hot reload
export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
