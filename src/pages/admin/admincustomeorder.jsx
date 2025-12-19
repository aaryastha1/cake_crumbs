// AdminCustomOrder.jsx
import React, { useState } from "react";
import axios from "axios";

const AdminCustomOrder = () => {
  const [cakeData, setCakeData] = useState({
    color: "",
    size: "",
    flavor: "",
    message: "",
    extras: [],
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setCakeData({ ...cakeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(cakeData).forEach((key) => formData.append(key, cakeData[key]));
    if (image) formData.append("referenceImage", image);

    try {
      const res = await axios.post("http://localhost:5006/api/customOrders", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Custom cake added!");
    } catch (err) {
      console.error(err);
      alert("Error uploading cake");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="color" placeholder="Color" onChange={handleChange} />
      <input type="text" name="size" placeholder="Size" onChange={handleChange} />
      <input type="text" name="flavor" placeholder="Flavor" onChange={handleChange} />
      <textarea name="message" placeholder="Message" onChange={handleChange}></textarea>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Add Cake</button>
    </form>
  );
};

export default AdminCustomOrder;
