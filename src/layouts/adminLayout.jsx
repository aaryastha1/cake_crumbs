import React from "react";
import { Outlet } from "react-router-dom"; 
import Sidebar from "../pages/admin/sidebar"; 

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      <Sidebar />

    
      <div style={{ flex: 1, padding: "20px", background: "#f8f8f8" }}>
        <Outlet /> {/* Nested admin pages will render here */}
      </div>
    </div>
  );
};

export default AdminLayout;
