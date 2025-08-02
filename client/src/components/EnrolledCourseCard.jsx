"use client"

import { useState } from "react"
import { Clock, User, DollarSign, Calendar } from "lucide-react"

const EnrolledCourseCard = ({ enrollment, onUnenroll }) => {
  const [unenrolling, setUnenrolling] = useState(false)
  const { courseId: course } = enrollment

  const handleUnenroll = async () => {
    if (window.confirm("Are you sure you want to unenroll from this course?")) {
      setUnenrolling(true)
      try {
        await onUnenroll()
      } finally {
        setUnenrolling(false)
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-l-4 border-green-500 p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Enrolled</span>
      </div>

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
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          <span>Enrolled on {formatDate(enrollment.enrollmentDate)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Continue Learning
        </button>
        <button
          onClick={handleUnenroll}
          disabled={unenrolling}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            unenrolling ? "bg-gray-400 text-white cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"
          }`}
        >
          {unenrolling ? "Unenrolling..." : "Unenroll"}
        </button>
      </div>
    </div>
  )
}

export default EnrolledCourseCard
