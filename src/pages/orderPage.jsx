import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${API}/api/orders/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [API]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-bold bg-[#FAF7F6]">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-bold bg-[#FAF7F6]">
        No Orders Found
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans text-[#2D3E50]">
      <Header />

      <div className="max-w-[800px] mx-auto p-6 py-12 space-y-4">
        <h1 className="text-2xl font-black mb-6">My Orders</h1>

        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center"
          >
            <div>
              <p className="font-bold">Order ID: {order._id}</p>
              <p className="text-sm text-gray-500">
                Total: Rs {order.total} — {order.paymentStatus}
              </p>
            </div>

            <button
              onClick={() => navigate(`/order-details/${order._id}`)}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default OrdersPage;
