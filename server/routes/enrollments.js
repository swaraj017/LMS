const express = require("express")
const Enrollment = require("../models/Enrollment")
const Course = require("../models/Course")
const auth = require("../middleware/auth")

const router = express.Router()

// GET /api/enrollments/my-courses - Get current user's enrolled courses
router.get("/my-courses", auth, async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user._id })
      .populate("courseId")
      .sort({ enrollmentDate: -1 })

    res.json(enrollments)
  } catch (error) {
    console.error("Error fetching enrollments:", error)
    res.status(500).json({ message: "Error fetching enrolled courses" })
  }
})

// POST /api/enrollments - Enroll in a course
router.post("/", auth, async (req, res) => {
  try {
    const { courseId } = req.body

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" })
    }

    // Check if course exists
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      courseId,
      userId: req.user._id,
    })

    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled in this course" })
    }

    // Create new enrollment
    const enrollment = new Enrollment({
      courseId,
      userId: req.user._id,
    })

    await enrollment.save()
    const populatedEnrollment = await Enrollment.findById(enrollment._id).populate("courseId")

    res.status(201).json({
      message: "Successfully enrolled in course",
      enrollment: populatedEnrollment,
    })
  } catch (error) {
    console.error("Error creating enrollment:", error)
    res.status(400).json({ message: "Error enrolling in course" })
  }
})

// DELETE /api/enrollments/:courseId - Unenroll from a course
router.delete("/:courseId", auth, async (req, res) => {
  try {
    const { courseId } = req.params

    const enrollment = await Enrollment.findOneAndDelete({
      courseId,
      userId: req.user._id,
    })

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" })
    }

    res.json({ message: "Successfully unenrolled from course" })
  } catch (error) {
    console.error("Error unenrolling:", error)
    res.status(500).json({ message: "Error unenrolling from course" })
  }
})

module.exports = router
