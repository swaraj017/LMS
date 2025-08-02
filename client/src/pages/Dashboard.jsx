"use client"

import { useState, useEffect } from "react"
import { courseAPI, enrollmentAPI } from "../services/api"
import CourseCard from "../components/CourseCard"
import LoadingSpinner from "../components/LoadingSpinner"

const Dashboard = () => {
  const [courses, setCourses] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [coursesData, enrollmentsData] = await Promise.all([
        courseAPI.getAllCourses(),
        enrollmentAPI.getEnrolledCourses(),
      ])

      setCourses(coursesData)
      setEnrolledCourses(enrollmentsData.map((enrollment) => enrollment.courseId._id))
    } catch (error) {
      setError("Failed to load courses")
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnrollment = async (courseId) => {
    try {
      await enrollmentAPI.enrollInCourse(courseId)
      setEnrolledCourses([...enrolledCourses, courseId])
    } catch (error) {
      alert(error.response?.data?.message || "Failed to enroll in course")
    }
  }

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 text-xl mb-4">{error}</div>
        <button
          onClick={loadData}
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
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Available Courses</h1>
        <p className="text-gray-600">Discover and enroll in our selection of courses</p>
      </div>

      {courses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl">No courses available at the moment.</div>
          <p className="text-gray-400 mt-2">Check back later for new courses!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              isEnrolled={enrolledCourses.includes(course._id)}
              onEnroll={() => handleEnrollment(course._id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard
