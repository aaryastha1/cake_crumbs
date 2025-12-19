import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Add icons for buttons

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  const fetchProducts = async () => {
    const res = await axios.get(`${API}/api/admin/products`);
    setProducts(res.data.products);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    await axios.delete(`${API}/api/admin/products/delete/${id}`);
    fetchProducts();
  };

  return (
    <div className="flex">
      {/* Sidebar can be part of layout */}
      <div className="flex-1 p-8 bg-[#fdf5f5] min-h-screen font-sans">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#5f3e4f]">Products</h2>
            <p className="text-gray-500 mt-1">Manage your delicious cake collection</p>
          </div>
          <button
            onClick={() => navigate("/admin/products/add")}
            className="bg-[#d87f7f] hover:bg-[#c76d6d] text-white font-semibold px-4 py-2 rounded-lg shadow transition duration-200"
          >
            + Add Product
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">No products found</p>
          )}

          {products.map(p => (
            <div key={p._id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden group">
              <img
                src={p.image ? `${API}${p.image}` : "/placeholder.png"}
                alt={p.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col">
                <h3 className="font-extrabold text-xl text-gray-800">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.occasion?.name}</p>

                {/* Flavours */}
                <div className="flex flex-wrap gap-2 mt-3 mb-2">
                  {p.flavours.length > 0 ? (
                    p.flavours.map(f => (
                      <span key={f._id} className="bg-[#f0e4e4] text-[#5f3e4f] px-3 py-1 rounded-full text-xs font-medium">
                        {f.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-xs">No flavours</span>
                  )}
                </div>

                {/* Sizes */}
                <div className="text-sm mb-2 space-y-1">
                  {p.sizes.map((s, i) => (
                    <div key={i} className="flex justify-between border-b border-gray-100 pb-1 last:border-b-0">
                      <span className="text-gray-600">{s.size}</span>
                      <span className="font-bold text-[#d87f7f]">₹{s.price}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-4 gap-2">
                  <Link
                    to={`/admin/products/view/${p._id}`}
                    className="flex-1 flex items-center justify-center bg-[#ebebeb] hover:bg-gray-300 text-gray-700 text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaEye className="mr-1" /> View
                  </Link>
                  <Link
                    to={`/admin/products/edit/${p._id}`}
                    className="flex-1 flex items-center justify-center bg-[#f8a48b] hover:bg-[#e78e76] text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex-1 flex items-center justify-center bg-[#f4787a] hover:bg-[#e36365] text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
