import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import Dashboard from "./pages/Dashboard";
import Project from "./pages/Project";
import Task from "./pages/Task";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer";
import Analytics from "./components/Analytics";

// ✅ Home page = Hero + Dashboard
const Home = () => {
  return (
    <>
      <Hero />
      <Analytics />
    </>
  );
};

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      <Navbar />

      <Routes>
        {/* ✅ Home */}
        <Route path="/" element={<Home />} />

        {/* Optional direct dashboard route */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Auth */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Core Pages */}
        <Route path="/projects" element={<Project />} />
        <Route path="/tasks" element={<Task />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;