import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Task() {
  const { currentUser } = useSelector((state) => state.user);

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignedTo: "",
    projectId: "",
    dueDate: "",
  });

  const token = localStorage.getItem("token");

  // ✅ Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();

      if (!res.ok) return toast.error("Failed to load tasks");

      setTasks(data);
    } catch (err) {
      toast.error("Error fetching tasks");
    }
  };

  // ✅ Fetch projects (for dropdown)
  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects", {
        headers: {
          Authorization: token,
        },
      });

      const data = await res.json();

      if (!res.ok) return;

      setProjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  // ✅ Create Task (Admin)
  const handleCreateTask = async (e) => {
    e.preventDefault();

    const { title, description, assignedTo, projectId, dueDate } = formData;

    if (!title || !assignedTo || !projectId) {
      return toast.error("Fill required fields");
    }

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      toast.success("Task created");
      setFormData({
        title: "",
        description: "",
        assignedTo: "",
        projectId: "",
        dueDate: "",
      });

      fetchTasks();
    } catch (err) {
      toast.error("Error creating task");
    }
  };

  // ✅ Update Task Status
  const handleUpdateStatus = async (taskId, status) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) return toast.error(data.message);

      toast.success("Status updated");
      fetchTasks();
    } catch (err) {
      toast.error("Error updating task");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      <h1 className="text-3xl font-bold mb-6">Tasks</h1>

      {/* ✅ Create Task (Admin only) */}
      {currentUser?.role === "Admin" && (
        <form
          onSubmit={handleCreateTask}
          className="bg-[#1e293b] p-6 rounded-xl mb-8 flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Task Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="p-3 rounded bg-transparent border border-gray-600"
          />

          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-3 rounded bg-transparent border border-gray-600"
          />

          {/* Project Dropdown */}
          <select
            value={formData.projectId}
            onChange={(e) =>
              setFormData({ ...formData, projectId: e.target.value })
            }
            className="p-3 rounded bg-[#1e293b] border border-gray-600"
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Assigned User */}
          <input
            type="text"
            placeholder="Assigned User ID"
            value={formData.assignedTo}
            onChange={(e) =>
              setFormData({ ...formData, assignedTo: e.target.value })
            }
            className="p-3 rounded bg-transparent border border-gray-600"
          />

          {/* Due Date */}
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData({ ...formData, dueDate: e.target.value })
            }
            className="p-3 rounded bg-transparent border border-gray-600"
          />

          <button className="bg-[#00df9a] text-black py-2 rounded font-semibold">
            Create Task
          </button>
        </form>
      )}

      {/* ✅ Task List */}
      <div className="grid gap-6">

        {tasks.length === 0 ? (
          <p className="text-gray-400">No tasks found 📝</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className="bg-[#1e293b] p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-bold">{task.title}</h2>
              <p className="text-gray-400">{task.description}</p>

              <p className="mt-2 text-sm">
                Status:{" "}
                <span className="font-semibold">{task.status}</span>
              </p>

              <p className="text-sm">
                Project: {task.projectId?.name}
              </p>

              <p className="text-sm">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>

              {/* Status Update */}
              {task.assignedTo === currentUser?._id && (
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() =>
                      handleUpdateStatus(task._id, "Todo")
                    }
                    className="bg-gray-500 px-3 py-1 rounded"
                  >
                    Todo
                  </button>

                  <button
                    onClick={() =>
                      handleUpdateStatus(task._id, "In Progress")
                    }
                    className="bg-yellow-500 px-3 py-1 rounded text-black"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() =>
                      handleUpdateStatus(task._id, "Done")
                    }
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  );
}