const mongoose = require("mongoose")

const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["active", "completed", "dropped"],
    default: "active",
  },
})

// Ensure a user can only enroll once per course
enrollmentSchema.index({ courseId: 1, userId: 1 }, { unique: true })

module.exports = mongoose.model("Enrollment", enrollmentSchema)
