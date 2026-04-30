import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { signOutSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // ✅ Sign Out
  const handleSignOut = () => {
    try {
      localStorage.removeItem("token");
      dispatch(signOutSuccess());
      toast.success("Logged out successfully");
      navigate("/sign-in");
    } catch (err) {
      toast.error("Error logging out");
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white bg-[#0f172a]">

        {/* Logo */}
        <Link to={currentUser ? "/dashboard" : "/"}>
          <h1 className="text-2xl font-bold text-[#00df9a]">
            Task Manager
          </h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">

          {currentUser && (
            <>
              <Link to="/" className="hover:text-[#00df9a]">
                Home
              </Link>
              
              <Link to="/dashboard" className="hover:text-[#00df9a]">
                Dashboard
              </Link>

              <Link to="/projects" className="hover:text-[#00df9a]">
                Projects
              </Link>

              <Link to="/tasks" className="hover:text-[#00df9a]">
                Tasks
              </Link>
            </>
          )}

          {/* Role */}
          {currentUser && (
            <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">
              {currentUser.role}
            </span>
          )}

          {/* Auth */}
          {currentUser ? (
            <button
              onClick={handleSignOut}
              className="bg-[#00df9a] text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition"
            >
              Sign Out
            </button>
          ) : (
            <Link to="/sign-in">
              <button className="bg-[#00df9a] text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-400 transition">
                Sign In
              </button>
            </Link>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div
          onClick={() => setNav(!nav)}
          className="block md:hidden cursor-pointer"
        >
          {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
        </div>
      </div>

      {/* ✅ Overlay */}
      {nav && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setNav(false)}
        />
      )}

      {/* ✅ Mobile Menu FULL SCREEN */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#1e293b] z-50 transform ${
          nav ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#00df9a]">
              Task Manager
            </h1>
            <AiOutlineClose
              size={25}
              className="cursor-pointer"
              onClick={() => setNav(false)}
            />
          </div>

          {/* Links */}
          {currentUser && (
            <>
              <Link to="/dashboard" onClick={() => setNav(false)}>
                <p className="py-4 border-b border-gray-600">Dashboard</p>
              </Link>

              <Link to="/projects" onClick={() => setNav(false)}>
                <p className="py-4 border-b border-gray-600">Projects</p>
              </Link>

              <Link to="/tasks" onClick={() => setNav(false)}>
                <p className="py-4 border-b border-gray-600">Tasks</p>
              </Link>
            </>
          )}

          {/* Auth */}
          <div className="mt-6">
            {currentUser ? (
              <button
                onClick={handleSignOut}
                className="bg-[#00df9a] text-black w-full py-3 rounded-lg font-semibold"
              >
                Sign Out
              </button>
            ) : (
              <Link to="/sign-in" onClick={() => setNav(false)}>
                <button className="bg-[#00df9a] text-black w-full py-3 rounded-lg font-semibold">
                  Sign In
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Navbar;