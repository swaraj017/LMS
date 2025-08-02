import CourseCard from "./CourseCard"

const CourseList = ({ courses, enrollments, onEnrollmentUpdate }) => {
  // Create a set of enrolled course IDs for quick lookup
  const enrolledCourseIds = new Set(enrollments.map((enrollment) => enrollment.courseId._id || enrollment.courseId))

  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-xl">No courses available at the moment.</div>
        <p className="text-gray-400 mt-2">Check back later for new courses!</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Available Courses</h2>
        <p className="text-gray-600">Browse and enroll in our selection of courses</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            isEnrolled={enrolledCourseIds.has(course._id)}
            onEnrollmentUpdate={onEnrollmentUpdate}
          />
        ))}
      </div>
    </div>
  )
}

export default CourseList
