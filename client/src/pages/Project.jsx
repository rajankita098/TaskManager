import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Project() {
    const { currentUser } = useSelector((state) => state.user);

    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [memberEmail, setMemberEmail] = useState("");

    const token = localStorage.getItem("token");

    // ✅ Fetch Projects (wrapped in useCallback)
    const fetchProjects = useCallback(async () => {
        try {
            // ✅ Use environment variable for backend URL
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE_URL}/api/projects`, {
                headers: {
                    Authorization: token,
                },
            });

            const data = await res.json();

            if (!res.ok) {
                return toast.error("Failed to load projects");
            }

            setProjects(data);
        } catch (err) {
            toast.error("Error fetching projects");
        }
    }, [token]); // token is a dependency

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // ✅ Create Project (Admin only)
    const handleCreateProject = async (e) => {
        e.preventDefault();

        if (!name || !description) {
            return toast.error("Fill all fields");
        }

        try {
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const res = await fetch(`${API_BASE_URL}/api/projects`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ name, description }),
            });

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message);
            }

            toast.success("Project created");
            setName("");
            setDescription("");
            fetchProjects();
        } catch (err) {
            toast.error("Error creating project");
        }
    };

    // ✅ Add Member
    const handleAddMember = async (projectId) => {
        if (!memberEmail) {
            return toast.error("Enter member email");
        }

        try {
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            // First find user by email (you may need backend API)
            const resUser = await fetch(`${API_BASE_URL}/api/auth/get-user?email=${memberEmail}`);
            const userData = await resUser.json();

            if (!resUser.ok) {
                return toast.error("User not found");
            }

            const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}/add-member`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ userId: userData._id }),
            });

            const data = await res.json();

            if (!res.ok) {
                return toast.error(data.message);
            }

            toast.success("Member added");
            setMemberEmail("");
            fetchProjects();
        } catch (err) {
            toast.error("Error adding member");
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white p-6">

            <h1 className="text-3xl font-bold mb-6">Projects</h1>

            {/* ✅ Create Project (Admin only) */}
            {currentUser?.role === "Admin" && (
                <form
                    onSubmit={handleCreateProject}
                    className="bg-[#1e293b] p-6 rounded-xl mb-8 flex flex-col gap-4"
                >
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 rounded bg-transparent border border-gray-600"
                    />

                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-3 rounded bg-transparent border border-gray-600"
                    />

                    <button className="bg-[#00df9a] text-black py-2 rounded font-semibold">
                        Create Project
                    </button>
                </form>
            )}

            {/* ✅ Project List */}
            <div className="grid md:grid-cols-2 gap-6">

                {projects.length === 0 ? (
                    <div className="col-span-full text-center text-gray-400 mt-10">
                        <p className="text-lg">No projects found 📂</p>

                        {currentUser?.role === "Admin" && (
                            <p className="text-sm mt-2">
                                Create your first project to get started 🚀
                            </p>
                        )}
                    </div>
                ) : (
                    projects.map((project) => (
                        <div
                            key={project._id}
                            className="bg-[#1e293b] p-6 rounded-xl shadow"
                        >
                            <h2 className="text-xl font-bold">{project.name}</h2>
                            <p className="text-gray-400">{project.description}</p>

                            {/* Members */}
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Members:</h3>
                                <ul className="text-sm text-gray-300">
                                    {project.members.map((m) => (
                                        <li key={m._id}>{m.name}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Add Member (Admin only) */}
                            {currentUser?.role === "Admin" && (
                                <div className="mt-4 flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="Member email"
                                        value={memberEmail}
                                        onChange={(e) => setMemberEmail(e.target.value)}
                                        className="p-2 rounded bg-transparent border border-gray-600 flex-1"
                                    />

                                    <button
                                        onClick={() => handleAddMember(project._id)}
                                        className="bg-green-500 px-3 rounded text-black font-semibold"
                                    >
                                        Add
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