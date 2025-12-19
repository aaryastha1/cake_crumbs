import React from "react";
import { Outlet } from "react-router-dom"; // Nested routes placeholder
import Sidebar from "../pages/admin/sidebar"; // Your Sidebar path

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div style={{ flex: 1, padding: "20px", background: "#f8f8f8" }}>
        <Outlet /> {/* Nested admin pages will render here */}
      </div>
    </div>
  );
};

export default AdminLayout;
