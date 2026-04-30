import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  });

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Use environment variable for backend URL
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

        // 👤 MEMBER DASHBOARD DATA
        if (currentUser?.role !== "Admin") {
          const res = await fetch(`${API_BASE_URL}/api/dashboard`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await res.json();

          if (res.ok) {
            setStats(data);
          } else {
            toast.error("Failed to load dashboard");
          }
        }

        // 👩‍💼 ADMIN DASHBOARD DATA
        if (currentUser?.role === "Admin") {
          const projRes = await fetch(`${API_BASE_URL}/api/projects`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const projData = await projRes.json();
          if (projRes.ok) {
            setProjects(projData);
          }

          const taskRes = await fetch(`${API_BASE_URL}/api/tasks/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const taskData = await taskRes.json();
          if (taskRes.ok) {
            setTasks(taskData);
          }
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        toast.error("Something went wrong");
      }
    };

    fetchData();
  }, [currentUser, token]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">

      {/* Heading */}
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {currentUser?.name} 👋
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading dashboard...</p>
      ) : (
        <>
          {/* 👤 MEMBER DASHBOARD */}
          {currentUser?.role !== "Admin" && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

              <div className="bg-[#1e293b] p-6 rounded-xl">
                <h2>Total Tasks</h2>
                <p className="text-3xl">{stats.total}</p>
              </div>

              <div className="bg-green-600 p-6 rounded-xl">
                <h2>Completed</h2>
                <p className="text-3xl">{stats.completed}</p>
              </div>

              <div className="bg-yellow-500 p-6 rounded-xl text-black">
                <h2>Pending</h2>
                <p className="text-3xl">{stats.pending}</p>
              </div>

              <div className="bg-red-600 p-6 rounded-xl">
                <h2>Overdue</h2>
                <p className="text-3xl">{stats.overdue}</p>
              </div>

            </div>
          )}

          {/* 👩‍💼 ADMIN DASHBOARD */}
          {currentUser?.role === "Admin" && (
            <div className="mt-6 bg-[#1e293b] p-6 rounded-xl">

              <h2 className="text-xl font-semibold mb-4">
                Project Overview
              </h2>

              {projects.length === 0 ? (
                <p className="text-gray-400">No projects found</p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => {

                    // ✅ Safe project-task matching
                    const projectTasks = tasks.filter(
                      (t) =>
                        (t.projectId?._id || t.projectId) === project._id
                    );

                    const total = projectTasks.length;

                    const completed = projectTasks.filter(
                      (t) => t.status === "Done"
                    ).length;

                    const progress =
                      total === 0
                        ? 0
                        : Math.round((completed / total) * 100);

                    return (
                      <div
                        key={project._id}
                        className="bg-[#0f172a] p-4 rounded-lg"
                      >
                        <h3 className="text-lg font-bold">
                          {project.name}
                        </h3>

                        <p className="text-sm text-gray-400">
                          {project.description}
                        </p>

                        <div className="mt-2 text-sm">

                          {/* ✅ Members excluding admin */}
                          <p>
                            Members:{" "}
                            {project.members
                              ?.filter(
                                (m) => m._id !== currentUser._id
                              )
                              .map((m) => m.name)
                              .join(", ") || "No members"}
                          </p>

                          <p>Total Tasks: {total}</p>

                          <p>Progress: {progress}%</p>

                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Common Section */}
          <div className="mt-10 bg-[#1e293b] p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">
              Quick Info
            </h2>

            <ul className="space-y-2 text-gray-300">
              <li>✔ Manage your projects efficiently</li>
              <li>✔ Assign tasks to team members</li>
              <li>✔ Track progress in real-time</li>
              <li>✔ Never miss deadlines</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}