// src/pages/admin/AdminCategories.jsx
import React, { useState, useEffect } from "react";
import { Trash2, Edit2, Check, X, Plus, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [editingType, setEditingType] = useState("");
  const [editingImage, setEditingImage] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5006/api/admin/categories");
      setCategories(res.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    await axios.delete(`http://localhost:5006/api/admin/categories/${id}`);
    fetchCategories();
  };

  const startEditing = (cat) => {
    setEditingId(cat._id);
    setEditingName(cat.name);
    setEditingType(cat.type);
    setEditingImage(null);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingName("");
    setEditingType("");
    setEditingImage(null);
  };

  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("name", editingName);
    formData.append("type", editingType);
    if (editingImage) formData.append("image", editingImage);

    await axios.put(`http://localhost:5006/api/admin/categories/${editingId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    cancelEditing();
    fetchCategories();
  };

  // Group categories by type
  const groupedCategories = categories.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cake Categories</h2>
      <Link
        to="/admin/categories/add"
        className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-6 inline-flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Add Category
      </Link>

      {Object.keys(groupedCategories).map((type) => (
        <div key={type} className="mb-8">
          <h3 className="text-xl font-semibold mb-3 capitalize">{type}</h3>
          <ul className="space-y-3">
            {groupedCategories[type].map((cat) => (
              <li key={cat._id} className="flex justify-between items-center border p-3 rounded-lg hover:bg-gray-50">
                {editingId === cat._id ? (
                  <div className="flex w-full gap-2 items-center">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="border px-2 py-1 rounded flex-1"
                    />
                    <select
                      value={editingType}
                      onChange={(e) => setEditingType(e.target.value)}
                      className="border px-2 py-1 rounded"
                    >
                      <option value="occasion">Occasion</option>
                      <option value="flavour">Flavour</option>
                      <option value="size">Size</option>
                      <option value="color">Color</option> {/* ✅ Added */}
                    </select>
                    <input type="file" onChange={(e) => setEditingImage(e.target.files[0])} />
                    <button onClick={saveEdit} className="bg-green-600 text-white p-2 rounded">
                      <Check className="w-4 h-4" />
                    </button>
                    <button onClick={cancelEditing} className="border p-2 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      {cat.image && (
                        <img
                          src={`http://localhost:5006${cat.image}`}
                          alt={cat.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div>
                        <div>{cat.name}</div>
                        <div className="text-gray-500 text-sm">{cat.type}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEditing(cat)} className="border p-2 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(cat._id)} className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => alert(`View: ${cat.name}`)} className="border p-2 rounded">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminCategories;
