// import React, { useEffect, useState } from "react";
// import { Trash2, Edit2, Check, X, Plus, Eye } from "lucide-react";
// import axios from "axios";

// const AdminBakery = () => {
//   const [bakeryItems, setBakeryItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [viewItem, setViewItem] = useState(null);

  
//   // State for adding/editing
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     category: "",
//     image: null, // ✅ added image
//   });

//   // 🔹 Fetch Data
//   const fetchCategories = async () => {
//     const res = await axios.get("http://localhost:5006/api/admin/categories/type/bakeries");
//     setCategories(res.data.categories);
//   };

//   const fetchBakeryItems = async () => {
//     const res = await axios.get("http://localhost:5006/api/admin/bakery");
//     setBakeryItems(res.data);
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchBakeryItems();
//   }, []);

//   // ➕ Save / Add Item
//   const handleSaveItem = async () => {
//     if (!formData.name || formData.price === "" || !formData.category) {
//   alert("Please fill in all fields");
//   return;
// }

// if (Number(formData.price) < 0) {
//   alert("Price cannot be negative");
//   return;
// }


//     try {
//       const data = new FormData();
//       data.append("name", formData.name);
//       data.append("price", formData.price);
//       data.append("category", formData.category);
//       if (formData.image) data.append("image", formData.image);

//       if (editingId) {
//         await axios.put(`http://localhost:5006/api/admin/bakery/${editingId}`, data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         await axios.post("http://localhost:5006/api/admin/bakery/add", data, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }
//       resetForm();
//       fetchBakeryItems();
//     } catch (err) {
//       console.error(err);
//       alert("Error saving item");
//     }
//   };

//   const resetForm = () => {
//     setFormData({ name: "", price: "", category: "", image: null });
//     setEditingId(null);
//     setShowModal(false);
//   };

//   const startEdit = (item) => {
//     setEditingId(item._id);
//     setFormData({
//       name: item.name,
//       price: item.price,
//       category: item.category?._id,
//       image: null, // reset image input for edit
//     });
//     setShowModal(true);
//   };

//   const deleteItem = async (id) => {
//     if (!window.confirm("Delete this bakery item?")) return;
//     await axios.delete(`http://localhost:5006/api/admin/bakery/${id}`);
//     fetchBakeryItems();
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Products</h1>
//           <p className="text-gray-500">Manage your delicious bakery collection</p>
//         </div>
//         <button 
//           onClick={() => setShowModal(true)}
//           className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all"
//         >
//           <Plus className="w-5 h-5" /> Add Product
//         </button>
//       </div>

//       {/* 📃 PRODUCT GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {bakeryItems.map((item) => (
//           <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
//             {item.image && (
//               <img src={`http://localhost:5006${item.image}`} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
//             )}
//             <div className="flex justify-between items-start mb-2">
//               <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
//               <span className="text-rose-500 font-bold">
//   Rs {Math.max(0, Number(item.price))}
// </span>

//             </div>
//             <p className="text-sm text-gray-400 mb-6">{item.category?.name}</p>
            
//             <div className="flex gap-3">
//               <button 
//   onClick={() => setViewItem(item)} // <-- open view modal
//   className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
// >
//   <Eye className="w-4 h-4" /> View
// </button>

//               <button 
//                 onClick={() => startEdit(item)}
//                 className="flex-1 flex items-center justify-center gap-2 bg-orange-100 text-orange-600 py-2 rounded-lg hover:bg-orange-200 transition-colors"
//               >
//                 <Edit2 className="w-4 h-4" /> Edit
//               </button>
//               <button 
//                 onClick={() => deleteItem(item._id)}
//                 className="p-2 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
//               >
//                 <Trash2 className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ➕ ADD/EDIT MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
//             <div className="p-6 flex justify-between items-center border-b">
//               <h2 className="text-xl font-bold flex items-center gap-2">
//                  <span className="p-2 bg-rose-50 rounded-lg">🍰</span> {editingId ? "Edit Product" : "Add New Product"}
//               </h2>
//               <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-full">
//                 <X className="w-6 h-6 text-gray-400" />
//               </button>
//             </div>

//             <div className="p-6 space-y-6">
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">Product Name</label>
//                 <input
//                   type="text"
//                   className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
//                   placeholder="e.g. Chocolate Croissant"
//                   value={formData.name}
//                   onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">Category</label>
//                   <select
//                     className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
//                     value={formData.category}
//                     onChange={(e) => setFormData({...formData, category: e.target.value})}
//                   >
//                     <option value="">Select</option>
//                     {categories.map(cat => (
//                       <option key={cat._id} value={cat._id}>{cat.name}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">Price (Rs)</label>
//                   <input
//   type="number"
//   min="0"
//   className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
//   placeholder="0.00"
//   value={formData.price}
//   onChange={(e) =>
//     setFormData({
//       ...formData,
//       price: Math.max(0, Number(e.target.value)),
//     })
//   }
// />




//                 </div>
//               </div>

//               {/* IMAGE UPLOAD */}
//               <div>
//                 <label className="text-sm font-semibold text-gray-600">Image</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
//                   className="mt-1"
//                 />
//                 {formData.image && (
//                   <img
//                     src={URL.createObjectURL(formData.image)}
//                     alt="preview"
//                     className="mt-2 w-32 h-32 object-cover rounded"
//                   />
//                 )}
//               </div>
//             </div>

//             <div className="p-6 bg-gray-50 mt-4">
//               <button 
//                 onClick={handleSaveItem}
//                 className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all"
//               >
//                 {editingId ? "Update Product" : "Save Product"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminBakery;



import React, { useEffect, useState } from "react";
import { Trash2, Edit2, Check, X, Plus, Eye } from "lucide-react";
import axios from "axios";

const AdminBakery = () => {
  const [bakeryItems, setBakeryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewItem, setViewItem] = useState(null);

  // State for adding/editing
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null, // ✅ added image
  });

  // 🔹 Fetch Data
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5006/api/admin/categories/type/bakeries");
    setCategories(res.data.categories);
  };

  const fetchBakeryItems = async () => {
    const res = await axios.get("http://localhost:5006/api/admin/bakery");
    setBakeryItems(res.data);
  };

  useEffect(() => {
    fetchCategories();
    fetchBakeryItems();
  }, []);

  // ➕ Save / Add Item
  const handleSaveItem = async () => {
    if (!formData.name || formData.price === "" || !formData.category) {
      alert("Please fill in all fields");
      return;
    }

    if (Number(formData.price) < 0) {
      alert("Price cannot be negative");
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      if (formData.image) data.append("image", formData.image);

      if (editingId) {
        await axios.put(`http://localhost:5006/api/admin/bakery/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5006/api/admin/bakery/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      resetForm();
      fetchBakeryItems();
    } catch (err) {
      console.error(err);
      alert("Error saving item");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", price: "", category: "", image: null });
    setEditingId(null);
    setShowModal(false);
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category?._id,
      image: null, // reset image input for edit
    });
    setShowModal(true);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this bakery item?")) return;
    await axios.delete(`http://localhost:5006/api/admin/bakery/${id}`);
    fetchBakeryItems();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500">Manage your delicious bakery collection</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* 📃 PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bakeryItems.map((item) => (
          <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            {item.image && (
              <img src={`http://localhost:5006${item.image}`} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4"/>
            )}
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
              <span className="text-rose-500 font-bold">
                Rs {Math.max(0, Number(item.price))}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6">{item.category?.name}</p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setViewItem(item)} // <-- open view modal
                className="flex-1 flex items-center justify-center gap-2 border py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Eye className="w-4 h-4" /> View
              </button>

              <button 
                onClick={() => startEdit(item)}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-100 text-orange-600 py-2 rounded-lg hover:bg-orange-200 transition-colors"
              >
                <Edit2 className="w-4 h-4" /> Edit
              </button>
              <button 
                onClick={() => deleteItem(item._id)}
                className="p-2 text-rose-500 bg-rose-50 rounded-lg hover:bg-rose-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ➕ ADD/EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 flex justify-between items-center border-b">
              <h2 className="text-xl font-bold flex items-center gap-2">
                 <span className="p-2 bg-rose-50 rounded-lg">🍰</span> {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">Product Name</label>
                <input
                  type="text"
                  className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  placeholder="e.g. Chocolate Croissant"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Category</label>
                  <select
                    className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="">Select</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Price (Rs)</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full border p-3 rounded-xl mt-1 focus:ring-2 focus:ring-rose-200 outline-none"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Math.max(0, Number(e.target.value)),
                      })
                    }
                  />
                </div>
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <label className="text-sm font-semibold text-gray-600">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                  className="mt-1"
                />
                {formData.image && (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="preview"
                    className="mt-2 w-32 h-32 object-cover rounded"
                  />
                )}
              </div>
            </div>

            <div className="p-6 bg-gray-50 mt-4">
              <button 
                onClick={handleSaveItem}
                className="w-full bg-rose-500 text-white py-4 rounded-2xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all"
              >
                {editingId ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 VIEW MODAL */}
      {viewItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setViewItem(null)} 
              className="absolute top-3 right-3 p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>

            <div className="p-6">
              {viewItem.image && (
                <img 
                  src={`http://localhost:5006${viewItem.image}`} 
                  alt={viewItem.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBakery;
