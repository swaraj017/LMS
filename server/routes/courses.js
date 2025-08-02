const express = require("express")
const Course = require("../models/Course")
const auth = require("../middleware/auth")

const router = express.Router()

// GET /api/courses - Get all courses (protected)
router.get("/", auth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 })
    res.json(courses)
  } catch (error) {
    console.error("Error fetching courses:", error)
    res.status(500).json({ message: "Error fetching courses" })
  }
})

// GET /api/courses/:id - Get single course
router.get("/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }
    res.json(course)
  } catch (error) {
    console.error("Error fetching course:", error)
    res.status(500).json({ message: "Error fetching course" })
  }
})

module.exports = router
