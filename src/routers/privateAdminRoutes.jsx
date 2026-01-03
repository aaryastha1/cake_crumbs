// src/routes/PrivateAdminRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// This hook reads the token and user info from localStorage
const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  if (!token || !userData) return null;

  try {
    return JSON.parse(userData); // user object stored on login
  } catch (err) {
    console.error("Invalid user data in localStorage", err);
    return null;
  }
};

const PrivateAdminRoute = () => {
  const user = getUserFromToken();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin
    return <Navigate to="/" replace />;
  }

  // Logged in as admin → render nested routes
  return <Outlet />;
};

export default PrivateAdminRoute;
