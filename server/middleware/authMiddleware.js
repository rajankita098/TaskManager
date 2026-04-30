import jwt from "jsonwebtoken";
import User from "../models/User.js";

// 🔐 Protect routes (check login)
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    // ✅ Handle "Bearer token"
    if (token && token.startsWith("Bearer")) {
      token = token.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Get user (without password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// 👩‍💼 Admin only middleware
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    return res.status(403).json({ message: "Admin only access" });
  }
  next();
};