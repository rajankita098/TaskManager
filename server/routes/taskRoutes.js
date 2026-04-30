import express from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController.js";
import { protect, isAdmin  } from "../middleware/authMiddleware.js";
import Task from "../models/Task.js";


const router = express.Router();

router.get("/all", protect, isAdmin, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.patch("/:id", protect, updateTaskStatus);

export default router;