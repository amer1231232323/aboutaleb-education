import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    phone: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },
  },
  { 
    timestamps: true,
    collection: 'users'
  }
);

// Prevent model recompilation during hot reload
export default mongoose.models.User || mongoose.model("User", UserSchema);
