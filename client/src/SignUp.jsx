import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Member" // default
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword, role } = formData;

    // ✅ Validation
    if (!name || !email || !password || !confirmPassword || !role) {
      return toast.error("Please fill all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role
        })
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        return toast.error(data.message || "Signup failed");
      }

      toast.success("Account created successfully 🎉");
      navigate("/"); // go to login

    } catch (err) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
      
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-[400px] p-8 bg-[#1e293b] rounded-2xl shadow-xl"
      >
        <h1 className="text-2xl font-bold text-center text-[#00df9a]">
          Create Account
        </h1>

        {/* Name */}
        <input
          type="text"
          id="name"
          placeholder="Full Name"
          className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-[#00df9a] outline-none"
          onChange={handleChange}
        />

        {/* Email */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-[#00df9a] outline-none"
          onChange={handleChange}
        />

        {/* Role Selection */}
        <select
          id="role"
          value={formData.role}
          onChange={handleChange}
          className="p-3 rounded-lg bg-[#1e293b] border border-gray-600 focus:border-[#00df9a] outline-none"
        >
          <option value="Member">Member</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-[#00df9a] outline-none"
          onChange={handleChange}
        />

        {/* Confirm Password */}
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-[#00df9a] outline-none"
          onChange={handleChange}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#00df9a] text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        {/* Redirect */}
        <p className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-[#00df9a] hover:underline">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}