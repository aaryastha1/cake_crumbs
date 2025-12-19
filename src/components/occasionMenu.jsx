// src/components/OccasionMenu.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OccasionMenu = () => {
  const [occasions, setOccasions] = useState([]);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const fetchOccasions = async () => {
      try {
        const res = await axios.get(`${API}/api/admin/categories/type/occasion`);
        setOccasions(res.data.categories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOccasions();
  }, []);

  return (
    <div className="flex gap-4 flex-wrap mb-6">
      {occasions.map(o => (
        <Link
          key={o._id}
          to={`/occasions/${o._id}`}
          className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
        >
          {o.name}
        </Link>
      ))}
    </div>
  );
};

export default OccasionMenu;
