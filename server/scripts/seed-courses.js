const mongoose = require("mongoose");
const path = require("path");

const Course = require(path.join(__dirname, "../models/Course"));
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MONGODB_URI = process.env.MONGODB_URI;

const sampleCourses = [
  {
    title: "Introduction to JavaScript",
    description:
      "Learn the fundamentals of JavaScript programming language. This course covers variables, functions, objects, and modern ES6+ features.",
    instructor: "Ankit Verma",
    duration: "8 weeks",
    price: 99,
  },
  {
    title: "React.js Fundamentals",
    description:
      "Master the basics of React.js including components, state management, hooks, and building interactive user interfaces.",
    instructor: "Priya Sharma",
    duration: "10 weeks",
    price: 149,
  },
  {
    title: "Node.js Backend Development",
    description:
      "Build scalable backend applications with Node.js and Express. Learn about APIs, databases, and server-side programming.",
    instructor: "Rohan Mehta",
    duration: "12 weeks",
    price: 199,
  },
  {
    title: "MongoDB Database Design",
    description:
      "Understand NoSQL database concepts and learn how to design and implement MongoDB databases for web applications.",
    instructor: "Sneha Iyer",
    duration: "6 weeks",
    price: 79,
  },
  {
    title: "Full Stack Web Development",
    description:
      "Complete course covering both frontend and backend development using modern technologies like React, Node.js, and MongoDB.",
    instructor: "Aman Gupta",
    duration: "16 weeks",
    price: 299,
  },
  {
    title: "CSS and Tailwind CSS",
    description:
      "Master CSS fundamentals and learn how to use Tailwind CSS for rapid UI development and responsive design.",
    instructor: "Nidhi Patil",
    duration: "4 weeks",
    price: 59,
  },
];

async function seedCourses() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB Atlas");

    await Course.deleteMany({});
    console.log("Cleared existing courses");

    const courses = await Course.insertMany(sampleCourses);
    console.log(`Inserted ${courses.length} courses`);

    console.log("\nSample courses:");
    courses.forEach((course) => {
      console.log(`- ${course.title} by ${course.instructor} (₹${course.price})`);
    });
  } catch (error) {
    console.error("Error seeding courses:", error);
  } finally {
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
}

seedCourses();
