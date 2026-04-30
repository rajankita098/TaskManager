import express from "express";
import { getAdminDashboard } from "../controllers/adminController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 Admin dashboard route
router.get("/dashboard", protect, isAdmin, getAdminDashboard);

export default router;