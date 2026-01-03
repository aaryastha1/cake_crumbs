import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "http://localhost:5006";

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/api/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data || []);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Updated Image Normalizer
  const getNormalizedUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("data:image") || url.startsWith("http")) return url;
    
    // Fix Windows backslashes and double slashes
    let cleanPath = url.replace(/\\/g, "/").replace(/\/+/g, "/");
    if (cleanPath.startsWith("/")) cleanPath = cleanPath.substring(1);
    
    return `${BACKEND_URL}/${cleanPath}`;
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-slate-500 font-bold">Loading Orders...</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-black mb-8 text-slate-800 text-center uppercase tracking-widest">
        Order Management
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl shadow-sm border border-slate-100 text-center">
          <p className="text-slate-400 font-medium">No orders found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-3xl shadow-sm border border-slate-100">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-left uppercase text-[10px] font-black tracking-widest">
                <th className="p-5">ID</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Items & Photos</th>
                <th className="p-5">Total</th>
                <th className="p-5">Payment Status</th>
                <th className="p-5">Schedule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-5 text-[10px] font-mono text-slate-400">
                    #{order._id.slice(-6)}
                  </td>
                  
                  <td className="p-5">
                    <p className="font-bold text-slate-800 text-sm">{order.firstName} {order.lastName}</p>
                    <p className="text-slate-500 text-[11px]">📞 {order.phone}</p>
                    <p className="text-slate-500 text-[11px] italic">📍 {order.address}</p>
                  </td>

                  <td className="p-5">
                    <div className="space-y-3">
                      {order.items && order.items.map((item, i) => {
                        // FIX: Use 'product' as key to match your backend model
                        const itemName = item.name || (item.product && item.product.name) || "Product";
                        const itemImg = item.image || (item.product && item.product.image);
                        const fullImgUrl = getNormalizedUrl(itemImg);

                        return (
                          <div key={i} className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm w-max min-w-[220px]">
                            <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center relative">
                              {fullImgUrl ? (
                                <img 
                                  src={fullImgUrl} 
                                  alt={itemName} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => { 
                                    e.target.style.display = 'none';
                                    if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div 
                                className="absolute inset-0 flex items-center justify-center text-[8px] text-slate-300 font-black text-center bg-gray-100"
                                style={{ display: fullImgUrl ? 'none' : 'flex' }}
                              >
                                NO<br/>IMG
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-[10px] uppercase">{itemName}</p>
                              {/* FIX: Ensure we use 'quantity' which is saved by the backend */}
                              <p className="text-slate-500 text-[9px]">
                                QTY: {item.quantity || item.qty || 1} {item.size || item.selectedSize ? `(${item.size || item.selectedSize})` : ""}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </td>

                  <td className="p-5 font-black text-slate-900 text-sm">
                    Rs {order.total?.toLocaleString()}
                  </td>

                  <td className="p-5">
                    <span className={`px-2 py-1 rounded-full text-[9px] font-black border uppercase ${
                      order.paymentStatus === 'PAID' || order.status === 'PAID'
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-orange-50 text-orange-600 border-orange-100'
                    }`}>
                      {order.paymentStatus || order.status || 'PENDING'}
                    </span>
                  </td>

                  <td className="p-5 text-[11px]">
                    <p className="font-bold text-slate-700">{order.scheduleDate || new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-slate-400 uppercase">{order.scheduleTime || "Standard"}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;