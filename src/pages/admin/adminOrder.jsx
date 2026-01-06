import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTimes } from 'react-icons/fa'; // Ensure react-icons is installed

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // NEW STATE: For the photo viewer
  const [selectedItem, setSelectedItem] = useState(null);

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

  const getNormalizedUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("data:image") || url.startsWith("http")) return url;
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
                <th className="p-5">Status</th>
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
                    <div className="space-y-2">
                      {order.items && order.items.map((item, i) => {
                        const itemName = item.name || "Unknown Product";
                        const fullImgUrl = getNormalizedUrl(item.image);

                        return (
                          <div 
                            key={i} 
                            // CLICK HANDLER ADDED HERE
                            onClick={() => setSelectedItem(item)}
                            className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-100 shadow-sm w-max min-w-[220px] cursor-pointer hover:border-blue-300 transition-all"
                          >
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
                              <p className="font-bold text-slate-800 text-[10px] uppercase leading-tight">{itemName}</p>
                              <p className="text-slate-500 text-[9px]">
                                QTY: {item.quantity} {item.size ? `(${item.size})` : ""}
                              </p>
                              {item.notes && (
                                <p className="text-blue-500 text-[8px] mt-1 italic leading-tight truncate w-32">Note: {item.notes}</p>
                              )}
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

      {/* --- PHOTO VIEWER MODAL --- */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-rose-500 hover:text-white transition-colors z-10"
            >
              <FaTimes size={20} />
            </button>

            {/* Large Image */}
            <div className="w-full h-80 bg-slate-100">
              <img 
                src={getNormalizedUrl(selectedItem.image)} 
                className="w-full h-full object-cover"
                alt="Product View"
              />
            </div>

            {/* Content Details */}
            <div className="p-8">
              <h2 className="text-2xl font-black text-slate-800 uppercase mb-2">
                {selectedItem.name}
              </h2>
              
              <div className="flex gap-4 mb-6">
                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Quantity</p>
                  <p className="text-lg font-black text-slate-800">x{selectedItem.quantity}</p>
                </div>
                {selectedItem.size && (
                  <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Size</p>
                    <p className="text-lg font-black text-slate-800">{selectedItem.size}</p>
                  </div>
                )}
              </div>

              {/* Notes Box */}
              <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100">
                <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Customer Notes</h3>
                <p className="text-slate-700 text-sm italic leading-relaxed">
                  {selectedItem.notes || "No extra instructions provided."}
                </p>
              </div>
              
              <button 
                onClick={() => setSelectedItem(null)}
                className="w-full mt-6 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-800 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;