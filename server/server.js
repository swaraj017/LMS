const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error(" MONGODB_URI environment variable is not set!")
  process.exit(1)
}

console.log("Attempting to connect to MongoDB...")

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(" Connected to MongoDB successfully!")
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message)
    process.exit(1)
  })

// Import routes
const authRoutes = require("./routes/auth")
const courseRoutes = require("./routes/courses")
const enrollmentRoutes = require("./routes/enrollments")

// Use routes
app.use("/api/auth", authRoutes)
app.use("/api/courses", courseRoutes)
app.use("/api/enrollments", enrollmentRoutes)

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "LMS API Server with JWT Auth is running!" })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Something went wrong!" })
})

app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`)
})
