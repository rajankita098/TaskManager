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

// ✅ Updated Middleware for Production
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // Allows requests from your Railway frontend
  credentials: true
}));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Route Middlewares
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
    console.error(`❌ Error: ${error.message}`);
    // Do not process.exit(1) in production if you want Railway to try restarting
  }
};

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB();
});

// Optional Health Check
app.get("/api/test", (req, res) => {
  res.json({ message: "API working perfectly 🚀" });
});