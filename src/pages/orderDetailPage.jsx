import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, MapPin, CreditCard } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem("token"); // make sure user is logged in
      try {
        const res = await axios.get(`${API}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id, API]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-bold bg-[#FAF7F6]">
        Loading...
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 font-bold bg-[#FAF7F6]">
        Order not found
      </div>
    );

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans text-[#2D3E50]">
      <Header />

      <div className="max-w-[800px] mx-auto p-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 hover:text-[#E24C63]"
        >
          <ChevronLeft size={14} /> Back to Orders
        </button>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-rose-50/50">
          {/* Header */}
          <div className="flex justify-between items-start mb-10 border-b pb-8">
            <div>
              <h1 className="text-2xl font-black mb-2">Order Details</h1>
              <p className="text-[11px] text-gray-400 font-bold">
                Order ID: {order._id}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-[9px] font-black uppercase ${
                order.paymentStatus === "PAID"
                  ? "bg-green-50 text-green-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>

          {/* Ordered Items */}
          <div className="mb-12">
            <h2 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-4">
              View Details
            </h2>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 bg-[#FAF7F6] p-4 rounded-2xl items-center"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  )}

                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.name}</p>
                    {item.flavor && (
                      <p className="text-[11px] text-gray-500">
                        Flavor: <span className="font-semibold">{item.flavor}</span>
                      </p>
                    )}
                    {item.size && (
                      <p className="text-[11px] text-gray-500">
                        Size: <span className="font-semibold">{item.size}</span>
                      </p>
                    )}
                    {item.note && (
                      <p className="text-[11px] text-gray-500 italic">Note: {item.note}</p>
                    )}
                    <p className="text-[11px] text-gray-500">Qty: {item.quantity}</p>
                  </div>

                  <p className="font-bold text-sm">Rs {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                <MapPin size={14} /> Shipping
              </h3>
              <div className="bg-[#FAF7F6] p-5 rounded-2xl text-xs font-bold text-gray-500">
                <p>{order.address}</p>
                <p>{order.phone}</p>
                <p>
                  {order.scheduleDate} ({order.scheduleTime})
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest">
                <CreditCard size={14} /> Payment
              </h3>
              <div
                className={`bg-[#FAF7F6] p-5 rounded-2xl text-xs font-bold ${
                  order.paymentStatus === "PAID" ? "text-green-600" : "text-red-600"
                }`}
              >
                {order.paymentMethod} — {order.paymentStatus}
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-slate-900 rounded-[24px] p-8 text-white flex justify-between items-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Total Amount
            </p>
            <p className="text-3xl font-black">Rs {order.total}</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetails;
