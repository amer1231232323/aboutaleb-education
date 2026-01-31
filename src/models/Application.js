import mongoose from 'mongoose';

// Admin Note Schema for structured admin notes
const AdminNoteSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  note: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, 'Note cannot exceed 1000 characters']
  },
  type: {
    type: String,
    enum: ['status_change', 'general', 'follow_up', 'document_review', 'interview'],
    default: 'general'
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  isPrivate: {
    type: Boolean,
    default: false // Whether this note is visible to the student
  }
}, { _id: true });

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
      enum: ["pending", "accepted", "rejected", "missing_documents", "under_review", "interview_scheduled", "waitlisted"],
      default: "pending",
      index: true,
    },

    // Legacy notes field for backward compatibility
    notes: {
      type: String,
      default: "",
      trim: true,
      maxlength: [2000, 'Notes cannot exceed 2000 characters']
    },

    // Enhanced structured admin notes
    adminNotes: [AdminNoteSchema],

    // Application metadata
    applicationData: {
      documents: [{
        name: String,
        url: String,
        uploadedAt: { type: Date, default: Date.now },
        verified: { type: Boolean, default: false }
      }],
      personalInfo: {
        gpa: Number,
        languageTest: {
          type: String,
          score: Number,
          date: Date
        },
        previousEducation: String,
        workExperience: String
      },
      preferences: {
        program: String,
        startDate: Date,
        accommodationNeeded: Boolean
      }
    },

    // Tracking information
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    statusHistory: [{
      status: String,
      changedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      changedAt: { type: Date, default: Date.now },
      reason: String
    }],

    // Priority and flags
    priority: {
      type: String,
      enum: ['low', 'normal', 'high', 'urgent'],
      default: 'normal'
    },

    flags: [{
      type: String,
      enum: ['incomplete_documents', 'requires_interview', 'scholarship_candidate', 'special_needs', 'urgent_processing']
    }],

    // Communication tracking
    lastContactDate: Date,
    nextFollowUpDate: Date,

    // Application source
    source: {
      type: String,
      enum: ['website', 'agent', 'referral', 'social_media', 'advertisement'],
      default: 'website'
    },

    // Submission tracking
    submittedAt: Date,
    reviewStartedAt: Date,
    reviewCompletedAt: Date,

    // External references
    externalApplicationId: String, // For integration with university systems

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: 'applications'
  }
);

// Compound indexes for faster queries
ApplicationSchema.index({ studentId: 1, universityId: 1 });
ApplicationSchema.index({ status: 1, createdAt: -1 });
ApplicationSchema.index({ lastModifiedBy: 1, updatedAt: -1 });
ApplicationSchema.index({ priority: 1, status: 1 });
ApplicationSchema.index({ nextFollowUpDate: 1, isActive: 1 });

// Virtual for getting public notes (non-private admin notes)
ApplicationSchema.virtual('publicNotes').get(function () {
  return this.adminNotes.filter(note => !note.isPrivate);
});

// Virtual for getting private notes (admin-only)
ApplicationSchema.virtual('privateNotes').get(function () {
  return this.adminNotes.filter(note => note.isPrivate);
});

// Method to add admin note
ApplicationSchema.methods.addAdminNote = function (adminId, note, type = 'general', isPrivate = false) {
  this.adminNotes.push({
    adminId,
    note,
    type,
    isPrivate,
    timestamp: new Date()
  });
  this.lastModifiedBy = adminId;
  return this.save();
};

// Method to update status with history tracking
ApplicationSchema.methods.updateStatus = function (newStatus, adminId, reason = '') {
  const oldStatus = this.status;
  this.status = newStatus;
  this.lastModifiedBy = adminId;

  // Add to status history
  this.statusHistory.push({
    status: newStatus,
    changedBy: adminId,
    changedAt: new Date(),
    reason
  });

  // Add automatic admin note for status change
  this.adminNotes.push({
    adminId,
    note: `Status changed from "${oldStatus}" to "${newStatus}"${reason ? `: ${reason}` : ''}`,
    type: 'status_change',
    isPrivate: false,
    timestamp: new Date()
  });

  return this.save();
};

// Method to get application summary
ApplicationSchema.methods.getSummary = function () {
  return {
    id: this._id,
    studentId: this.studentId,
    universityId: this.universityId,
    universityName: this.universityName,
    status: this.status,
    priority: this.priority,
    flags: this.flags,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    lastModifiedBy: this.lastModifiedBy,
    notesCount: this.adminNotes.length,
    documentsCount: this.applicationData.documents.length
  };
};

// Pre-save middleware to update timestamps
ApplicationSchema.pre('save', function (next) {
  if (this.isModified() && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

// Ensure virtual fields are serialized
ApplicationSchema.set('toJSON', { virtuals: true });
ApplicationSchema.set('toObject', { virtuals: true });

// Prevent model recompilation during hot reload
export default mongoose.models.Application || mongoose.model("Application", ApplicationSchema);
