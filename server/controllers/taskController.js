import Task from "../models/Task.js";
import Project from "../models/Project.js";

// ✅ Create Task (only if user is part of project)
import User from "../models/User.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, projectId, dueDate } = req.body;

    // 🔍 Find user by email
    const user = await User.findOne({ email: assignedTo });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔍 Check project
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ✅ Check if user is part of project
    if (!project.members.includes(user._id)) {
      return res.status(400).json({ message: "User not in project" });
    }

    // ✅ Create task using userId
    const task = await Task.create({
      title,
      description,
      assignedTo: user._id,
      projectId,
      dueDate
    });

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ Get tasks (only assigned user)
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user._id
    }).populate("projectId", "name");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ Update task status (only assigned user)
export const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔒 Only assigned user can update
    if (task.assignedTo.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ✅ Validate status
    const allowedStatus = ["Todo", "In Progress", "Done"];

    if (!allowedStatus.includes(req.body.status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    // Update status
    task.status = req.body.status;
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};