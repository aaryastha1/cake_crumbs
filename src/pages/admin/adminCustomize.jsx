import React, { useEffect, useState } from "react";
import axios from "axios";
import { BiCake } from "react-icons/bi";

const AdminCustomCake = () => {
  const [categories, setCategories] = useState({
    flavour: [],
    size: [],
    color: [],
    shape: [],
    topping: [],
  });

  const [form, setForm] = useState({
    name: "",
    basePrice: 0,
    flavour: [],
    size: [],
    color: [],
    shape: [],
    topping: [],
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState(null);

  // Store separate images per color
  const [colorImages, setColorImages] = useState({});

  const API_URL = "http://localhost:5006/api/admin";

  // Fetch all category types
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const types = ["flavour", "size", "color", "shape", "topping"];
        const res = await Promise.all(types.map(type => axios.get(`${API_URL}/categories/type/${type}`)));

        setCategories({
          flavour: res[0].data.categories || [],
          size: res[1].data.categories || [],
          color: res[2].data.categories || [],
          shape: res[3].data.categories || [],
          topping: res[4].data.categories || [],
        });
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleSelection = (key, id) => {
    setForm(prev => {
      const list = prev[key];
      if (list.includes(id)) return { ...prev, [key]: list.filter(i => i !== id) };
      return { ...prev, [key]: [...list, id] };
    });
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMainImage(file);
    setMainPreview(URL.createObjectURL(file));
  };

  const handleColorImageChange = (colorId, file) => {
    setColorImages(prev => ({ ...prev, [colorId]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("basePrice", form.basePrice);
      fd.append("flavour", form.flavour.join(","));
      fd.append("size", form.size.join(","));
      fd.append("color", form.color.join(","));
      fd.append("shape", form.shape.join(","));
      fd.append("topping", form.topping.join(","));

      if (mainImage) fd.append("image", mainImage);
      Object.values(colorImages).forEach(file => fd.append("colorImages", file));

      await axios.post(`${API_URL}/custom-cakes/add`, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("✅ Custom cake added successfully");

      // Reset
      setForm({ name: "", basePrice: 0, flavour: [], size: [], color: [], shape: [], topping: [] });
      setMainImage(null);
      setMainPreview(null);
      setColorImages({});
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add custom cake");
    }
  };

  const renderCategoryButtons = (key, items) => (
    <div className="flex flex-wrap gap-2">
      {items.map(item => (
        <button
          key={item._id}
          type="button"
          onClick={() => toggleSelection(key, item._id)}
          className={`px-4 py-2 rounded-full text-sm ${form[key].includes(item._id) ? "bg-pink-500 text-white" : "bg-gray-200"}`}
        >
          {item.name} {item.price ? `(${item.price})` : ""}
        </button>
      ))}
    </div>
  );

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
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Base Price"
          type="number"
          className="border p-2 w-full rounded"
          value={form.basePrice}
          onChange={e => setForm({ ...form, basePrice: e.target.value })}
          required
        />

        <div>
          <h3 className="font-semibold mb-2">Flavours</h3>
          {renderCategoryButtons("flavour", categories.flavour)}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Sizes</h3>
          {renderCategoryButtons("size", categories.size)}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Shapes</h3>
          {renderCategoryButtons("shape", categories.shape)}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Toppings</h3>
          {renderCategoryButtons("topping", categories.topping)}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Colors & Upload Images</h3>
          <div className="flex flex-wrap gap-4">
            {categories.color.map(c => (
              <div key={c._id} className="flex flex-col items-center">
                <label className="cursor-pointer">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      backgroundColor: c.name.toLowerCase(),
                      border: form.color.includes(c._id) ? "2px solid #f472b6" : "2px solid #ddd",
                      marginBottom: "4px"
                    }}
                    onClick={() => toggleSelection("color", c._id)}
                  />
                  <input
                    type="file"
                    className="hidden"
                    onChange={e => handleColorImageChange(c._id, e.target.files[0])}
                  />
                </label>
                <span className="text-xs">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

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

        <button type="submit" className="w-full bg-pink-500 text-white py-2 rounded font-semibold">
          Add Custom Cake
        </button>
      </form>
    </div>
  );
};

export default AdminCustomCake;
