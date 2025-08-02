"use client"

import { useState } from "react"
import { Clock, User, DollarSign } from "lucide-react"

const CourseCard = ({ course, isEnrolled, onEnroll }) => {
  const [enrolling, setEnrolling] = useState(false)

  const handleEnroll = async () => {
    setEnrolling(true)
    try {
      await onEnroll()
    } finally {
      setEnrolling(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{course.description}</p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <User className="w-4 h-4 mr-2" />
          <span>{course.instructor}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          <span>{course.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
           
          <span>Rs {course.price}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {isEnrolled ? (
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-medium">✓ Enrolled</span>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              enrolling ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {enrolling ? "Enrolling..." : "Enroll Now"}
          </button>
        )}
      </div>
    </div>
  )
}

export default CourseCard
