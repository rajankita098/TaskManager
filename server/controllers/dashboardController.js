import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id });

    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "Done").length;
    const pending = tasks.filter(t => t.status !== "Done").length;

    const overdue = tasks.filter(
      t => t.dueDate && t.dueDate < new Date() && t.status !== "Done"
    ).length;

    res.json({
      total,
      completed,
      pending,
      overdue
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};