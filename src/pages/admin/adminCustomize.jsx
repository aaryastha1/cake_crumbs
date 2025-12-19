// AdminCustomOrder.jsx
import React, { useState } from "react";
import axios from "axios";

const AdminCustomOrder = () => {
  const [cakeData, setCakeData] = useState({
    colors: [],
    sizes: [],
    flavors: [],
    messages: [],
    extras: [],
  });

  const [inputs, setInputs] = useState({
    colorInput: "",
    sizeInput: "",
    flavorInput: "",
    messageInput: "",
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleAddOption = (type) => {
    const inputKey = type + "Input"; // e.g., "colorInput"
    if (inputs[inputKey].trim() === "") return;
    setCakeData({ ...cakeData, [type]: [...cakeData[type], inputs[inputKey]] });
    setInputs({ ...inputs, [inputKey]: "" }); // clear that input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(cakeData).forEach((key) =>
      formData.append(key, JSON.stringify(cakeData[key]))
    );
    if (image) formData.append("referenceImage", image);

    try {
      await axios.post("http://localhost:5006/api/customOrders", formData, {
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
      <div>
        <h3>Colors</h3>
        {cakeData.colors.map((c, i) => (
          <span key={i}>{c} </span>
        ))}
        <input
          name="colorInput"
          value={inputs.colorInput}
          onChange={handleInputChange}
          placeholder="Add color"
        />
        <button type="button" onClick={() => handleAddOption("colors")}>
          Add Color
        </button>
      </div>

      <div>
        <h3>Sizes</h3>
        {cakeData.sizes.map((s, i) => (
          <span key={i}>{s} </span>
        ))}
        <input
          name="sizeInput"
          value={inputs.sizeInput}
          onChange={handleInputChange}
          placeholder="Add size"
        />
        <button type="button" onClick={() => handleAddOption("sizes")}>
          Add Size
        </button>
      </div>

      <div>
        <h3>Flavors</h3>
        {cakeData.flavors.map((f, i) => (
          <span key={i}>{f} </span>
        ))}
        <input
          name="flavorInput"
          value={inputs.flavorInput}
          onChange={handleInputChange}
          placeholder="Add flavor"
        />
        <button type="button" onClick={() => handleAddOption("flavors")}>
          Add Flavor
        </button>
      </div>

      <div>
        <h3>Messages</h3>
        {cakeData.messages.map((m, i) => (
          <span key={i}>{m} </span>
        ))}
        <input
          name="messageInput"
          value={inputs.messageInput}
          onChange={handleInputChange}
          placeholder="Add message"
        />
        <button type="button" onClick={() => handleAddOption("messages")}>
          Add Message
        </button>
      </div>

      <div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <button type="submit">Add Cake</button>
    </form>
  );
};

export default AdminCustomOrder;
