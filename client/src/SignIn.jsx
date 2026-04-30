import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "./redux/user/userSlice";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        return toast.error(data.message);
      }

      // ✅ Store token (IMPORTANT)
      localStorage.setItem("token", data.token);

      // ✅ Clean user data
      const userData = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };

      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(userData));

      toast.success("Login successful 🚀");

      // ✅ Redirect based on role
      navigate("/");

    } catch (err) {
      dispatch(signInFailure(err.message));
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
          Team Task Manager
        </h1>

        {/* Email */}
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-[#00df9a] outline-none"
          onChange={handleChange}
        />

        {/* Password */}
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-transparent border border-gray-600 focus:border-[#00df9a] outline-none"
          onChange={handleChange}
        />

        {/* Button */}
        <button
          type="submit"
          className="bg-[#00df9a] text-black font-semibold py-3 rounded-lg hover:bg-green-400 transition"
        >
          Sign In
        </button>

        {/* Redirect */}
        <p className="text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-[#00df9a] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
}