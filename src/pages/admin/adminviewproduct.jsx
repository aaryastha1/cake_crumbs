import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5006/api/admin/products/${id}`)
      .then(res => setProduct(res.data.product))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-6">
      <button onClick={() => navigate(-1)} className="text-purple-600 mb-4">← Back</button>

      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>

      {product.image && <img src={`http://localhost:5006${product.image}`} alt={product.name} className="h-64 w-full object-cover rounded mb-4" />}

      <p className="mb-2"><strong>Occasion:</strong> {product.occasion?.name}</p>
      <p className="mb-2"><strong>Flavours:</strong> {product.flavours.map(f => f.name).join(", ") || "—"}</p>
      <div className="mb-2">
        <strong>Sizes & Prices:</strong>
        {product.sizes.map((s, i) => (
          <div key={i}>{s.size} – ₹{s.price}</div>
        ))}
      </div>

      <p className="mt-4">{product.description || "No description"}</p>
    </div>
  );
}
