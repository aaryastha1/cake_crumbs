import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiCake } from "react-icons/bi";

const AdminCustomCake = () => {
  const [categories, setCategories] = useState({
    flavour: [],
    size: [],
    color: [],
  });

  const [form, setForm] = useState({
    name: "",
    basePrice: 0,
    flavour: [],
    size: [],
    color: [],
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);

  // Store separate images per color
  const [colorImages, setColorImages] = useState({});

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [flavourRes, sizeRes, colorRes] = await Promise.all([
          axios.get("http://localhost:5006/api/admin/categories/type/flavour"),
          axios.get("http://localhost:5006/api/admin/categories/type/size"),
          axios.get("http://localhost:5006/api/admin/categories/type/color"),
        ]);

        setCategories({
          flavour: flavourRes.data.categories || [],
          size: sizeRes.data.categories || [],
          color: colorRes.data.categories || [],
        });
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Toggle selection for flavours, sizes, colors
  const toggleSelection = (key, id) => {
    setForm((prev) => {
      const list = prev[key];
      if (list.includes(id)) return { ...prev, [key]: list.filter((i) => i !== id) };
      return { ...prev, [key]: [...list, id] };
    });
  };

  // Main image preview
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  // Color image change
  const handleColorImageChange = (colorId, file) => {
    setColorImages((prev) => ({ ...prev, [colorId]: file }));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("basePrice", form.basePrice);
      fd.append("flavour", form.flavour.join(","));
      fd.append("size", form.size.join(","));
      fd.append("color", form.color.join(","));

      if (mainImage) fd.append("image", mainImage);

      // Append color images
      // Append color images correctly
      Object.values(colorImages).forEach((file) => {
        fd.append("colorImages", file);
      });


      await axios.post("http://localhost:5006/api/admin/custom-cakes/add", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Custom cake added successfully");

      // Reset
      setForm({ name: "", basePrice: 0, flavour: [], size: [], color: [] });
      setMainImage(null);
      setMainPreview(null);
      setColorImages({});
    } catch (err) {
      console.error("Add cake error", err);
      alert("❌ Failed to add custom cake");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <BiCake className="mr-2 text-pink-500" /> Add Custom Cake
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Cake Name"
          className="border p-2 w-full rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Base Price"
          type="number"
          className="border p-2 w-full rounded"
          value={form.basePrice}
          onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
          required
        />

        {/* Flavours */}
        <div>
          <h3 className="font-semibold mb-2">Flavour</h3>
          <div className="flex flex-wrap gap-2">
            {categories.flavour.map((f) => (
              <button
                key={f._id}
                type="button"
                onClick={() => toggleSelection("flavour", f._id)}
                className={`px-4 py-2 rounded-full text-sm ${form.flavour.includes(f._id) ? "bg-pink-500 text-white" : "bg-gray-200"
                  }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <h3 className="font-semibold mb-2">Size</h3>
          <div className="flex flex-wrap gap-2">
            {categories.size.map((s) => (
              <button
                key={s._id}
                type="button"
                onClick={() => toggleSelection("size", s._id)}
                className={`px-4 py-2 rounded-full text-sm ${form.size.includes(s._id) ? "bg-pink-500 text-white" : "bg-gray-200"
                  }`}
              >
                {s.name} (${s.price})
              </button>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <h3 className="font-semibold mb-2">Color & Upload Image</h3>
          <div className="flex flex-wrap gap-4">
            {categories.color.map((c) => (
              <div key={c._id} className="flex flex-col items-center">
                <label className="cursor-pointer">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: c.name.toLowerCase(),
                      border: form.color.includes(c._id) ? "2px solid #f472b6" : "2px solid #ddd",
                      marginBottom: "4px",
                    }}
                    onClick={() => toggleSelection("color", c._id)}
                  />
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleColorImageChange(c._id, e.target.files[0])}
                  />
                </label>
                <span className="text-xs">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="block cursor-pointer">
            <div className="border-dashed border-2 p-6 rounded text-center">
              {mainPreview ? (
                <img src={mainPreview} className="h-24 mx-auto rounded" alt="preview" />
              ) : (
                <div className="text-gray-400">Click to upload main image</div>
              )}
            </div>
            <input type="file" className="hidden" onChange={handleMainImageChange} />
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded font-semibold"
        >
          Add Custom Cake
        </button>
      </form>
    </div>
  );
};

export default AdminCustomCake;
