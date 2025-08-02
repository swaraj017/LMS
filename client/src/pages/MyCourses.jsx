"use client"

import { useState, useEffect } from "react"
import { enrollmentAPI } from "../services/api"
import EnrolledCourseCard from "../components/EnrolledCourseCard"
import LoadingSpinner from "../components/LoadingSpinner"

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadEnrolledCourses()
  }, [])

  const loadEnrolledCourses = async () => {
    try {
      setLoading(true)
      const data = await enrollmentAPI.getEnrolledCourses()
      setEnrolledCourses(data)
    } catch (error) {
      setError("Failed to load enrolled courses")
      console.error("Error loading enrolled courses:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleUnenroll = async (courseId) => {
    try {
      await enrollmentAPI.unenrollFromCourse(courseId)
      setEnrolledCourses(enrolledCourses.filter((enrollment) => enrollment.courseId._id !== courseId))
    } catch (error) {
      alert("Failed to unenroll from course")
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <button
          onClick={loadEnrolledCourses}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">My Courses</h1>
        <p className="text-gray-600">Courses you are currently enrolled in</p>
      </div>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl">You haven't enrolled in any courses yet.</div>
          <p className="text-gray-400 mt-2">Go to the Home page to browse available courses!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enrollment) => (
            <EnrolledCourseCard
              key={enrollment._id}
              enrollment={enrollment}
              onUnenroll={() => handleUnenroll(enrollment.courseId._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyCourses
