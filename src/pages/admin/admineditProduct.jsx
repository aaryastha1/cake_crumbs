import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedFlavours, setSelectedFlavours] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", occasion: "", image: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Fetch categories
    axios.get("http://localhost:5006/api/admin/categories").then(res => setCategories(res.data.categories));

    // Fetch product
    axios.get(`http://localhost:5006/api/admin/products/${id}`)
      .then(res => {
        const p = res.data.product;
        setForm({ name: p.name, description: p.description, occasion: p.occasion?._id, image: null });
        setSizes(p.sizes);
        setSelectedFlavours(p.flavours.map(f => f._id));
        setPreview(p.image ? `http://localhost:5006${p.image}` : null);
      });
  }, [id]);

  const addSize = () => setSizes([...sizes, { size: "", price: "" }]);
  const removeSize = (i) => setSizes(sizes.filter((_, index) => index !== i));
  const toggleFlavour = (id) => {
    if (selectedFlavours.includes(id)) setSelectedFlavours(selectedFlavours.filter(f => f !== id));
    else setSelectedFlavours([...selectedFlavours, id]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("occasion", form.occasion);
    formData.append("flavours", JSON.stringify(selectedFlavours));
    formData.append("sizes", JSON.stringify(sizes));
    if (form.image) formData.append("image", form.image);

    await axios.put(`http://localhost:5006/api/admin/products/edit/${id}`, formData);
    navigate("/admin/products");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          placeholder="Product Name"
          className="border rounded p-3 w-full focus:ring-2 focus:ring-purple-300"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className="border rounded p-3 w-full focus:ring-2 focus:ring-purple-300"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <select
          className="border rounded p-3 w-full focus:ring-2 focus:ring-purple-300"
          value={form.occasion}
          onChange={e => setForm({ ...form, occasion: e.target.value })}
        >
          <option value="">Select Occasion</option>
          {categories.filter(c => c.type === "occasion").map(c => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <div>
          <p className="font-semibold mb-1">Flavours</p>
          <div className="flex flex-wrap gap-2">
            {categories.filter(c => c.type === "flavour").map(f => (
              <label key={f._id} className="flex items-center gap-1 border rounded p-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFlavours.includes(f._id)}
                  onChange={() => toggleFlavour(f._id)}
                />
                {f.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sizes & Prices</h3>
          {sizes.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2 items-center">
              <input
                placeholder="Size (1 Pound)"
                className="border p-2 w-1/2 rounded focus:ring-2 focus:ring-purple-200"
                value={s.size}
                onChange={e => { const copy = [...sizes]; copy[i].size = e.target.value; setSizes(copy); }}
              />
              <input
                placeholder="Price"
                type="number"
                className="border p-2 w-1/2 rounded focus:ring-2 focus:ring-purple-200"
                value={s.price}
                onChange={e => { const copy = [...sizes]; copy[i].price = e.target.value; setSizes(copy); }}
              />
              {sizes.length > 1 && <button type="button" onClick={() => removeSize(i)} className="text-red-500 font-bold">×</button>}
            </div>
          ))}
          <button type="button" onClick={addSize} className="text-purple-600 font-semibold mb-2">+ Add Size</button>
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              setForm({ ...form, image: e.target.files[0] });
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          {preview && <img src={preview} alt="preview" className="mt-2 h-32 rounded object-cover"/>}
        </div>

        <button type="submit" className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">Save Changes</button>
      </form>
    </div>
  );
}
