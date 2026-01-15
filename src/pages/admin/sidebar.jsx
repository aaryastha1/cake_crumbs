import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaClipboardList, FaUsers, FaCookieBite, FaSignOutAlt } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";


const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: FaTachometerAlt },
    { name: "Products", path: "/admin/products", icon: FaBoxOpen },
    { name: "Categories", path: "/admin/categories", icon: FaClipboardList },
    { name: "Orders", path: "/admin/orders", icon: FaUsers },
    { name: "Bakeries", path: "/admin/bakery", icon: FaBoxOpen }
  ];

  const handleLogout = () => {
  const confirmLogout = window.confirm("Are you sure you want to logout?");
  if (confirmLogout) {
    logout();
    navigate("/login");
  }
};



  return (
    <div className="w-64 bg-[#5f3e4f] min-h-screen flex flex-col text-white">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Cake and Crumbs</h2>
        
        <ul className="space-y-1">
          {menuItems.map(item => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded transition-all duration-200 ${
                    isActive 
                      ? "bg-[#7d5c6f] font-semibold text-[#d87f7f]" 
                      : "hover:bg-[#7d5c6f] text-gray-200"
                  }`}
                >
                  <Icon className="mr-3 text-lg" />
                  <span className="text-sm">{item.name}</span>
                  {isActive && <div className="ml-auto w-1 h-5 bg-[#d87f7f] rounded-full shadow-[0_0_8px_#d87f7f]"></div>} 
                </Link>
              </li>
            );
          })}

          {/* LOGOUT BUTTON - Styled exactly like the links */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center p-3 rounded transition-all duration-200 text-gray-200 hover:bg-[#7d5c6f] group"
            >
              <FaSignOutAlt className="mr-3 text-lg group-hover:text-[#d87f7f]" />
              <span className="text-sm">Logout</span>
            </button>
          </li>
        </ul>
      </div>
      
      {/* Bottom Profile Section */}
      <div className="mt-auto p-6 border-t border-[#7d5c6f]">
        <div className="flex items-center">
            <div className="w-9 h-9 rounded-xl bg-[#7d5c6f] flex items-center justify-center text-[#d87f7f] font-bold mr-3 border border-[#d87f7f]/20">
              A
            </div>
            <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">Admin User</p>
                <p className="text-[10px] text-gray-400 truncate tracking-wide">admin@cakeandcrumbs.com</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;