// src/components/SidebarFilters.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper component for individual filter items
const FilterItem = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium mb-1 ${
      isActive
        ? "bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white shadow-md"
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
    }`}
  >
    {label}
  </button>
);

export default function SidebarFilters({ onFilter }) {
  const [occasions, setOccasions] = useState([]);
  const [flavours, setFlavours] = useState([]);
  
  // Track active filters for UI state
  const [activeFilters, setActiveFilters] = useState({
    occasion: "all",
    flavour: "all"
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_BASE = "http://localhost:5006/api/admin/categories/type/";
        const occ = await axios.get(`${API_BASE}occasion`);
        const flav = await axios.get(`${API_BASE}flavour`);

        if (occ.data?.categories) setOccasions(occ.data.categories);
        if (flav.data?.categories) setFlavours(flav.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFilterClick = (key, value) => {
    setActiveFilters(prev => ({ ...prev, [key]: value }));
    // If value is "all", we pass an empty object or null depending on your backend logic
    onFilter({ [key]: value === "all" ? "" : value });
  };

  return (
    <div className="w-64 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 h-fit">
      <h2 className="text-xl font-bold mb-8 text-gray-900">Browse Cakes</h2>

      {/* Occasions Group */}
      <div className="mb-8">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-[#d84e6d] mb-4">
          Occasions
        </h3>
        <FilterItem 
          label="All Occasions" 
          isActive={activeFilters.occasion === "all"} 
          onClick={() => handleFilterClick("occasion", "all")} 
        />
        {occasions.map((occ) => (
          <FilterItem
            key={occ._id}
            label={occ.name}
            isActive={activeFilters.occasion === occ._id}
            onClick={() => handleFilterClick("occasion", occ._id)}
          />
        ))}
      </div>

      {/* Flavours Group */}
      <div className="mb-4">
        <h3 className="text-[11px] font-black uppercase tracking-widest text-[#d84e6d] mb-4">
          Flavours
        </h3>
        <FilterItem 
          label="All Flavors" 
          isActive={activeFilters.flavour === "all"} 
          onClick={() => handleFilterClick("flavour", "all")} 
        />
        {flavours.map((flav) => (
          <FilterItem
            key={flav._id}
            label={flav.name}
            isActive={activeFilters.flavour === flav._id}
            onClick={() => handleFilterClick("flavour", flav._id)}
          />
        ))}
      </div>
    </div>
  );
}