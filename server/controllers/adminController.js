import Project from "../models/Project.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const adminId = req.user._id;

    // ✅ Get projects created by this admin
    const projects = await Project.find({ createdBy: adminId })
      .populate("members", "name email");

    const result = [];

    for (let project of projects) {

      // ✅ Get tasks of this project
      const tasks = await Task.find({ projectId: project._id });

      const totalTasks = tasks.length;

      const completedTasks = tasks.filter(
        (t) => t.status === "Done"
      ).length;

      const progress =
        totalTasks === 0
          ? 0
          : Math.round((completedTasks / totalTasks) * 100);

      // ✅ Remove admin from members list
      const filteredMembers = project.members.filter(
        (m) => m._id.toString() !== adminId.toString()
      );

      result.push({
        projectId: project._id,
        name: project.name,
        description: project.description,
        members: filteredMembers,
        totalTasks,
        completedTasks,
        progress,
      });
    }

    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};