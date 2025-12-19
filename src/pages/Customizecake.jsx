// UserCustomize.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserCustomize = () => {
  const [customizations, setCustomizations] = useState([]);
  const [selectedCake, setSelectedCake] = useState(null);
  const [userChoice, setUserChoice] = useState({
    color: "Pink",
    size: "2 Pounds",
    flavor: "Vanilla",
    price: 20, // default price
  });

  useEffect(() => {
    const fetchCustomizations = async () => {
      try {
        const res = await axios.get("http://localhost:5006/api/customOrders");
        setCustomizations(res.data);
      } catch (err) {
        console.error("Error fetching cakes:", err);
      }
    };
    fetchCustomizations();
  }, []);

  const handleCakeSelect = (cake) => {
    setSelectedCake(cake);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Reset default selection
    setUserChoice({ color: "Pink", size: "2 Pounds", flavor: "Vanilla", price: 20 });
  };

  const handleChange = (key, value, price = null) => {
    const newChoice = { ...userChoice, [key]: value };
    if (price) newChoice.price = price;
    setUserChoice(newChoice);
  };

  return (
    <div style={{ backgroundColor: "#fdfdfd", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <Header />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        {selectedCake ? (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "40px" }}>
            {/* LEFT PANEL: SELECTIONS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
              <button
                onClick={() => setSelectedCake(null)}
                style={{ alignSelf: "flex-start", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "1rem" }}
              >
                ← Back to Gallery
              </button>

              {/* COLOR */}
              <div style={cardStyle}>
                <h3 style={labelStyle}>Color</h3>
                <div style={{ display: "flex", gap: "15px" }}>
                  {["Pink", "White", "Blue", "Yellow"].map((c) => (
                    <div
                      key={c}
                      onClick={() => handleChange("color", c)}
                      style={{
                        ...optionBoxStyle,
                        borderColor: userChoice.color === c ? "#e91e63" : "#eee",
                        backgroundColor: userChoice.color === c ? "#fff0f3" : "#fff",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor: c.toLowerCase(),
                          width: "100%",
                          height: "35px",
                          borderRadius: "4px",
                          border: "1px solid #eee",
                        }}
                      />
                      <span style={{ fontSize: "12px", marginTop: "5px", display: "block" }}>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SIZE */}
              <div style={cardStyle}>
                <h3 style={labelStyle}>Size</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  {[
                    { label: "1 Pound",  },
                    { label: "2 Pounds",  },
                    { label: "3 Pounds",  },
                    { label: "4 Pounds", },
                  ].map((s) => (
                    <div
                      key={s.label}
                      onClick={() => handleChange("size", s.label, s.price)}
                      style={{
                        ...sizeBoxStyle,
                        borderColor: userChoice.size === s.label ? "#e91e63" : "#eee",
                        backgroundColor: userChoice.size === s.label ? "#fff0f3" : "#fff",
                      }}
                    >
                      <div style={{ fontWeight: "600" }}>{s.label}</div>
                      <div style={{ fontSize: "0.85rem", color: "#666" }}>${s.price}</div>
                      {userChoice.size === s.label && <div style={checkStyle}>✓</div>}
                    </div>
                  ))}
                </div>
              </div>

              {/* FLAVOR */}
              <div style={cardStyle}>
                <h3 style={labelStyle}>Flavor</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {[
                    { name: "Vanilla", desc: "Classic and timeless" },
                    { name: "Chocolate", desc: "Rich and decadent" },
                    { name: "Strawberry", desc: "Fresh and fruity" },
                    { name: "Red Velvet", desc: "Smooth and luxurious" },
                  ].map((f) => (
                    <div
                      key={f.name}
                      onClick={() => handleChange("flavor", f.name)}
                      style={{
                        ...flavorBoxStyle,
                        borderColor: userChoice.flavor === f.name ? "#e91e63" : "#eee",
                        backgroundColor: userChoice.flavor === f.name ? "#fff0f3" : "#fff",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "600" }}>{f.name}</div>
                        <div style={{ fontSize: "0.8rem", color: "#666" }}>{f.desc}</div>
                      </div>
                      {userChoice.flavor === f.name && <div style={{ color: "#e91e63", fontWeight: "bold" }}>✓</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: IMAGE PREVIEW */}
            <div style={{ position: "sticky", top: "20px", height: "fit-content", ...cardStyle, boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
              <h3 style={labelStyle}>Your Selection</h3>
              <div style={{ width: "100%", height: "250px", overflow: "hidden", borderRadius: "12px", marginBottom: "20px", position: "relative" }}>
                <img
                  src={`http://localhost:5006/uploads/${selectedCake.referenceImage}`}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Color overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: userChoice.color.toLowerCase(),
                    mixBlendMode: "multiply",
                    opacity: 0.3,
                    pointerEvents: "none",
                    borderRadius: "12px",
                  }}
                />
              </div>

              <div style={{ borderTop: "1px solid #eee", paddingTop: "15px" }}>
                <div style={summaryRow}><span>Color</span><strong>{userChoice.color}</strong></div>
                <div style={summaryRow}><span>Size</span><strong>{userChoice.size}</strong></div>
                <div style={summaryRow}><span>Flavor</span><strong>{userChoice.flavor}</strong></div>
                <div style={summaryRow}><span>Price</span><strong>${userChoice.price}</strong></div>
              </div>
              <button style={btnStyle}>Add to Cart — ${userChoice.price}</button>
            </div>
          </div>
        ) : (
          /* GALLERY */
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <h1 style={{ fontSize: "2.5rem", color: "#0a1d37", marginBottom: "10px" }}>Select a Base Cake</h1>
            <p style={{ color: "#666", marginBottom: "40px" }}>Pick a style below to start customizing your dream cake.</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "25px" }}>
              {customizations.map((cake) => (
                <div key={cake._id} onClick={() => handleCakeSelect(cake)} style={galleryItemStyle}>
                  <img src={`http://localhost:5006/uploads/${cake.referenceImage}`} alt="cake" style={{ width: "100%", height: "220px", objectFit: "cover" }} />
                  <div style={{ padding: "15px" }}>
                    <h4 style={{ margin: "0 0 5px 0" }}>Base Cake #{cake._id.slice(-4)}</h4>
                    <p style={{ fontSize: "13px", color: "#e91e63", fontWeight: "600", margin: 0 }}>Click to Customize</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

// --- Styles ---
const cardStyle = { backgroundColor: "white", padding: "25px", borderRadius: "15px", border: "1px solid #eee" };
const labelStyle = { marginTop: 0, marginBottom: "20px", fontSize: "1.1rem", color: "#0a1d37" };
const summaryRow = { display: "flex", justifyContent: "space-between", marginBottom: "12px", fontSize: "0.95rem" };
const optionBoxStyle = { border: "2px solid", borderRadius: "10px", padding: "10px", cursor: "pointer", width: "75px", textAlign: "center", transition: "0.2s" };
const sizeBoxStyle = { border: "2px solid", borderRadius: "12px", padding: "15px", cursor: "pointer", position: "relative", transition: "0.2s" };
const flavorBoxStyle = { border: "2px solid", borderRadius: "12px", padding: "15px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "0.2s" };
const checkStyle = { position: "absolute", top: "10px", right: "12px", color: "#e91e63", fontWeight: "bold" };
const btnStyle = { width: "100%", padding: "16px", backgroundColor: "#e91e63", color: "white", border: "none", borderRadius: "12px", fontWeight: "bold", fontSize: "1rem", cursor: "pointer", marginTop: "15px", boxShadow: "0 4px 12px rgba(233, 30, 99, 0.3)" };
const galleryItemStyle = { backgroundColor: "#fff", borderRadius: "15px", overflow: "hidden", cursor: "pointer", border: "1px solid #eee", transition: "transform 0.3s", textAlign: "left", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" };

export default UserCustomize;
