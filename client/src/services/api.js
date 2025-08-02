import axios from "axios"

const API_BASE_URL = "https://lms-rtq5.onrender.com"

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (name, email, password) => api.post("/auth/register", { name, email, password }),
  getCurrentUser: () => api.get("/auth/me"),
}

// Course API
export const courseAPI = {
  getAllCourses: () => api.get("/courses"),
  getCourse: (id) => api.get(`/courses/${id}`),
}

// Enrollment API
export const enrollmentAPI = {
  getEnrolledCourses: () => api.get("/enrollments/my-courses"),
  enrollInCourse: (courseId) => api.post("/enrollments", { courseId }),
  unenrollFromCourse: (courseId) => api.delete(`/enrollments/${courseId}`),
}
