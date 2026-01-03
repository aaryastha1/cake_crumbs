import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaCookieBite, FaPalette, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Hook for redirection

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
    { name: "Products", path: "/admin/products", icon: FaBoxOpen },
    { name: "Categories", path: "/admin/categories", icon: FaClipboardList },
    { name: "Orders", path: "/admin/orders", icon: FaUsers },
    { name: "Customers", path: "/admin/customers", icon: FaCookieBite },
    { name: "Customize Cakes", path: "/admin/customizes", icon: FaPalette },
    { name: "Bakeries", path: "/admin/bakery", icon: FaBoxOpen }
  ];

  // LOGOUT FUNCTION
  const handleLogout = () => {
    // 1. Remove the token from local storage
    localStorage.removeItem("token");
    
    // 2. Optional: Clear other user-related data if you have any
    // localStorage.removeItem("user");

    // 3. Redirect to the login page
    navigate("/login"); 
  };

  return (
    <div className="w-64 bg-[#5f3e4f] min-h-screen flex flex-col text-white">
      <div className="p-6">
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
                      ? "bg-[#7d5c6f] font-semibold text-[#d87f7f]" 
                      : "hover:bg-[#7d5c6f] text-gray-200"
                  }`}
                >
                  <Icon className="mr-3" />
                  {item.name}
                  {isActive && <div className="ml-auto w-1 h-5 bg-[#d87f7f] rounded-full"></div>} 
                </Link>
              </li>
            );
          })}

          {/* LOGOUT BUTTON LINK */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded transition-colors text-gray-200 hover:bg-[#d87f7f] hover:text-white mt-4"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </li>
        </ul>
      </div>
      
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