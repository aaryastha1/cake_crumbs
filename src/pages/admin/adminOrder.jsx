import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/customOrders"); // Make sure port matches backend
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin: Custom Cake Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <div>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <table
              border="1"
              cellPadding="10"
              style={{ borderCollapse: "collapse", width: "100%", marginTop: "1rem" }}
            >
              <thead>
                <tr>
                  <th>Cake Image</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Flavor</th>
                  <th>Message</th>
                  <th>Extras</th>
                  <th>Reference Image</th>
                  <th>Notes</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img
                        src={`/cakes/teddy-${order.color ? order.color.toLowerCase() : 'default'}.jpg`}
                        alt={order.color || "Default"}
                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{order.color || "-"}</td>
                    <td>{order.size || "-"}</td>
                    <td>{order.flavor || "-"}</td>
                    <td>{order.message || "-"}</td>
                    <td>{order.extras ? order.extras.join(", ") : "-"}</td>
                    <td>
                      {order.referenceImage ? (
                        <img
                          src={`http://localhost:5000/uploads/${order.referenceImage}`}
                          alt="Reference"
                          style={{ width: "100px", height: "100px", objectFit: "cover" }}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td>{order.notes || "-"}</td>
                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
