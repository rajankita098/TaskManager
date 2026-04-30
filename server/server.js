import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dns from 'dns';  
import { setDefaultResultOrder } from 'dns';

// DNS Fixes for MongoDB Atlas connectivity
dns.setServers(['8.8.8.8', '8.8.4.4']);
setDefaultResultOrder('ipv4first');

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS configuration – allow your Vercel frontend if CLIENT_URL is set, otherwise allow all origins (for development)
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : '*';
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// If CLIENT_URL is not set, log a warning (but still allow all)
if (!process.env.CLIENT_URL) {
  console.warn('⚠️ CLIENT_URL environment variable is not set. CORS will allow all origins.');
}

app.use(express.json());

// Test route (basic health check)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Optional explicit health check endpoint (useful for monitoring)
app.get("/api/test", (req, res) => {
  res.json({ message: "API working perfectly 🚀" });
});

// ✅ Route middlewares
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    // Do not exit the process – let Railway handle restarts
  }
};

// Start the server only after successful DB connection (optional but recommended)
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();