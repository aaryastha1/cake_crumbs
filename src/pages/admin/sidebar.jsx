import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaCookieBite, FaPalette } from 'react-icons/fa'; // Added icons for visual coherence

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
    { name: "Products", path: "/admin/products", icon: FaBoxOpen },
    { name: "Categories", path: "/admin/categories", icon: FaClipboardList },
    { name: "Orders", path: "/admin/orders", icon: FaUsers },
    { name: "Customers", path: "/admin/customers", icon: FaCookieBite },
    { name: "Customize Cakes", path: "/admin/customizes", icon: FaPalette },
    { name: "bakeries", path: "/admin/bakery", icon: FaBoxOpen}
  ];

  return (
    <div className="w-64 bg-[#5f3e4f] min-h-screen flex flex-col text-white">
      <div className="p-6">
        {/* Logo/Name from UI: "Sweet Delights" */}
        <h2 className="text-2xl font-bold mb-8">Sweet Delights</h2>
        
        <ul className="space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);

            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded transition-colors ${
                    isActive 
                      ? "bg-[#7d5c6f] font-semibold text-[#d87f7f]" // Active item background and text color
                      : "hover:bg-[#7d5c6f] text-gray-200"
                  }`}
                >
                  <Icon className="mr-3" />
                  {item.name}
                  {/* The red indicator for active/selected item */}
                  {isActive && <div className="ml-auto w-1 h-5 bg-[#d87f7f] rounded-full"></div>} 
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Admin User Section at the bottom */}
      <div className="mt-auto p-6 border-t border-[#7d5c6f]">
        <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[#5f3e4f] font-bold mr-3 text-sm">A</div>
            <div>
                <p className="font-semibold text-sm">Admin User</p>
                <p className="text-xs text-gray-400">admin@sweetdelights.com</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;