import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaTimes,
  FaPlus,
  FaCamera,
  FaRulerCombined,
  FaDollarSign,
  FaTag,
} from "react-icons/fa";
import { BiCake } from "react-icons/bi";

export default function AddProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([{ size: "", price: "" }]);
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    occasion: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Fetch categories
  useEffect(() => {
    axios
      .get("http://localhost:5006/api/admin/categories")
      .then((res) => setCategories(res.data.categories));
  }, []);

  // Size handlers
  const addSize = () => setSizes([...sizes, { size: "", price: "" }]);
  const removeSize = (index) =>
    setSizes(sizes.filter((_, i) => i !== index));

  // Flavour toggle
  const toggleFlavour = (id) => {
    setSelectedFlavours((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  // Image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("occasion", form.occasion);
    formData.append("flavours", JSON.stringify(selectedFlavours));
    formData.append("sizes", JSON.stringify(sizes));
    if (form.image) formData.append("image", form.image);

    await axios.post(
      "http://localhost:5006/api/admin/products/add",
      formData
    );
    navigate("/admin/products");
  };

  const occasions = categories.filter((c) => c.type === "occasion");
  const flavours = categories.filter((c) => c.type === "flavour");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 overflow-auto py-10">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-[#5f3e4f] flex items-center">
            <BiCake className="mr-3 text-[#d87f7f] text-2xl" />
            Add New Product
          </h2>
          <button
            onClick={() => navigate("/admin/products")}
            className="text-gray-400 hover:text-[#5f3e4f]"
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Basic Info */}
          <div>
            <label className="text-sm font-medium text-gray-500">
              Product Name
            </label>
            <input
              className="border p-3 rounded-lg w-full"
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label className="text-sm font-medium text-gray-500 mt-4 block">
              Description
            </label>
            <textarea
              rows="3"
              className="border p-3 rounded-lg w-full"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <label className="text-sm font-medium text-gray-500 mt-4 block">
              Occasion
            </label>
            <select
              className="border p-3 rounded-lg w-full"
              required
              value={form.occasion}
              onChange={(e) =>
                setForm({ ...form, occasion: e.target.value })
              }
            >
              <option value="">Select Occasion</option>
              {occasions.map((o) => (
                <option key={o._id} value={o._id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>

          {/* Flavours */}
          <div>
            <h3 className="font-semibold text-sm mb-2">Flavours</h3>
            <div className="flex flex-wrap gap-2">
              {flavours.map((f) => (
                <label
                  key={f._id}
                  className={`px-4 py-2 rounded-full cursor-pointer text-sm ${
                    selectedFlavours.includes(f._id)
                      ? "bg-[#f4787a] text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedFlavours.includes(f._id)}
                    onChange={() => toggleFlavour(f._id)}
                  />
                  {f.name}
                </label>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div>
            {sizes.map((s, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  placeholder="Size"
                  className="border p-2 rounded w-1/2"
                  value={s.size}
                  onChange={(e) => {
                    const copy = [...sizes];
                    copy[i].size = e.target.value;
                    setSizes(copy);
                  }}
                />
                <input
                  placeholder="Price"
                  type="number"
                  className="border p-2 rounded w-1/2"
                  value={s.price}
                  onChange={(e) => {
                    const copy = [...sizes];
                    copy[i].price = e.target.value;
                    setSizes(copy);
                  }}
                />
                {sizes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSize(i)}
                    className="text-red-500"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSize}
              className="text-[#d87f7f] text-sm flex items-center"
            >
              <FaPlus className="mr-1" /> Add Size
            </button>
          </div>

          {/* Image */}
          <div>
            <label className="block cursor-pointer">
              <div className="border-dashed border-2 p-6 rounded text-center">
                {preview ? (
                  <img
                    src={preview}
                    className="h-24 mx-auto rounded"
                    alt="preview"
                  />
                ) : (
                  <>
                    <FaCamera className="mx-auto text-3xl text-gray-400" />
                    <p className="text-sm text-gray-500">Upload image</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#5f3e4f] text-white py-3 rounded-lg font-semibold"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
