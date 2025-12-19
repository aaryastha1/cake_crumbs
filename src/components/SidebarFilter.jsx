// src/components/SidebarFilters.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper component for rendering filter groups (Occasions, Flavours, Sizes)
const FilterListGroup = ({ title, options, filterKey, onFilter }) => (
    <div className="mb-6 border-b border-pink-100 last:border-b-0 pb-4">
        <h3 className="font-bold text-xl mb-3 text-pink-700">{title}</h3>
        <ul className="space-y-1">
            {options.map((option) => (
                <li key={option._id || option.name} className="group">
                    <button
                        className="w-full text-left py-2 px-3 rounded transition duration-150 
                                   text-gray-700 hover:bg-pink-50 hover:text-pink-600 focus:outline-none"
                        onClick={() => {
                            // Determine the value to send back (ID for most, name for size)
                            const filterValue = filterKey === 'size' ? option.name : option._id;
                            onFilter({ [filterKey]: filterValue });
                        }}
                    >
                        {option.name}
                    </button>
                </li>
            ))}
            {options.length === 0 && <li>No {title.toLowerCase()} found</li>}
        </ul>
    </div>
);

// Helper component for rendering the Colors group (using color swatches)
const ColorFilterGroup = ({ colors, onFilter }) => (
    <div className="mb-6 pb-4">
        <h3 className="font-bold text-xl mb-3 text-pink-700">Color</h3>
        <div className="flex flex-wrap gap-3">
            {colors.map((c) => (
                <button
                    key={c._id}
                    title={c.name}
                    className="w-7 h-7 rounded-full shadow-md border-2 border-gray-100 hover:ring-2 hover:ring-pink-400 transition"
                    style={{ backgroundColor: c.name.toLowerCase() }} // Use actual color name for swatch
                    onClick={() => onFilter({ color: c._id })}
                >
                    <span className="sr-only">{c.name}</span>
                </button>
            ))}
        </div>
    </div>
);


export default function SidebarFilters({ onFilter }) {
    // State and useEffect logic remain UNCHANGED
    
    const [occasions, setOccasions] = useState([]);
    const [flavours, setFlavours] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const API_BASE = "http://localhost:5006/api/admin/categories/type/";
          const occ = await axios.get(`${API_BASE}occasion`);
          const flav = await axios.get(`${API_BASE}flavour`);
          const size = await axios.get(`${API_BASE}size`);
          const color = await axios.get(`${API_BASE}color`);

          if (occ.data && occ.data.categories) setOccasions(occ.data.categories);
          if (flav.data && flav.data.categories) setFlavours(flav.data.categories);
          if (size.data && size.data.categories) setSizes(size.data.categories);
          if (color.data && color.data.categories) setColors(color.data.categories);
        } catch (err) {
          console.error("Failed to fetch categories:", err);
        }
      };
      fetchCategories();
    }, []);

  return (
      <div className="w-64 p-6 bg-white shadow-lg h-full border-r border-pink-100">
          <h2 className="text-2xl font-extrabold mb-6 text-gray-800 border-b border-pink-200 pb-3">
              Browse Cakes
          </h2>
          
          {/* Occasions */}
          <FilterListGroup 
              title="Occasions" 
              options={occasions} 
              filterKey="occasion" 
              onFilter={onFilter} 
          />

          {/* Flavours */}
          <FilterListGroup 
              title="Flavours" 
              options={flavours} 
              filterKey="flavour" 
              onFilter={onFilter} 
          />

          {/* Sizes */}
          <FilterListGroup 
              title="Sizes" 
              options={sizes} 
              filterKey="size" 
              onFilter={onFilter} 
          />

          {/* Colors */}
          <ColorFilterGroup 
              colors={colors} 
              onFilter={onFilter} 
          />
      </div>
  );
}