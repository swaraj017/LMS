# Learning Management System (LMS)

A simple LMS application with course listing and student enrollment functionality.

## Features

- **Course Listing**: View available courses with details
- **Student Enrollment**: Enroll in courses with one click
- **Enrollment Status**: See which courses you're already enrolled in
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend (Client)
- React.js with Vite
- Tailwind CSS for styling
- Axios for API calls

### Backend (Server)
- Node.js with Express.js
- MongoDB with Mongoose
- CORS enabled for cross-origin requests

## Project Structure

\`\`\`
lms-app/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── ...
│   └── package.json
├── server/          # Express backend
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   └── package.json
└── package.json     # Root package.json
\`\`\`

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. **Clone and install dependencies:**
   \`\`\`bash
   npm run install-all
   \`\`\`

2. **Set up environment variables:**
   Create a `.env` file in the `server` directory:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/lms
   PORT=5000
   \`\`\`

3. **Start MongoDB:**
   Make sure MongoDB is running on your system.

4. **Seed the database (optional):**
   \`\`\`bash
   cd server
   node scripts/seed-courses.js
   \`\`\`

5. **Start the application:**
   \`\`\`bash
   npm run dev
   \`\`\`

   This will start both the server (port 5000) and client (port 3000).

### Manual Setup

If you prefer to start each service separately:

1. **Start the server:**
   \`\`\`bash
   cd server
   npm install
   npm run dev
   \`\`\`

2. **Start the client:**
   \`\`\`bash
   cd client
   npm install
   npm run dev
   \`\`\`

## API Endpoints

- `GET /api/courses` - Get all available courses
- `GET /api/enrollments/me` - Get current student's enrollments
- `POST /api/enrollments` - Enroll in a course

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Browse the available courses
3. Click "Enroll" to enroll in a course
4. Enrolled courses will show "✓ Enrolled" status

## Database Schema

### Course Collection
\`\`\`javascript
{
  title: String,
  description: String,
  instructor: String,
  duration: String,
  createdAt: Date
}
\`\`\`

### Enrollment Collection
\`\`\`javascript
{
  courseId: ObjectId (ref: Course),
  studentId: String (default: 'dummyStudent123'),
  enrollmentDate: Date
}
\`\`\`

## Development Notes

- The application uses a dummy student ID (`dummyStudent123`) for simplicity
- Duplicate enrollments are prevented by database constraints
- The frontend includes error handling and loading states
- The backend includes basic error handling and validation
