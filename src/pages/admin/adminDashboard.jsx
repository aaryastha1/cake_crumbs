import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGlobe, FaShoppingBag, FaStore, FaClock, FaUsers } from 'react-icons/fa';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5006/api/admin/dash/dashboard-stats", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon: Icon, colorClass, glowClass }) => (
    <div className="relative bg-[#111827] border border-gray-800 p-5 rounded-xl overflow-hidden">
      <div className={`absolute top-0 right-0 w-16 h-16 opacity-10 blur-2xl ${glowClass}`}></div>
      <div className="flex justify-between items-center relative z-10">
        <div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorClass} text-white shadow-lg`}>
          <Icon size={18} />
        </div>
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen bg-[#0b0f1a] p-8 text-white">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-300 p-8 font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#10b98120] border border-[#10b98150] rounded-xl">
          <FaStore className="text-[#10b981]" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Admin Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here's what's happening.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        <StatCard title="Revenue" value={`Rs ${data?.stats?.totalRevenue.toLocaleString()}`} icon={FaGlobe} colorClass="bg-emerald-500" glowClass="bg-emerald-500" />
        <StatCard title="Orders" value={data?.stats?.totalOrders} icon={FaShoppingBag} colorClass="bg-orange-500" glowClass="bg-orange-500" />
        <StatCard title="Bakeries" value={data?.stats?.totalBakeries} icon={FaStore} colorClass="bg-blue-500" glowClass="bg-blue-500" />
        <StatCard title="Pending" value={data?.stats?.pendingOrders} icon={FaClock} colorClass="bg-rose-500" glowClass="bg-rose-500" />
        <StatCard title="Customers" value={data?.stats?.totalCustomers} icon={FaUsers} colorClass="bg-purple-500" glowClass="bg-purple-500" />
      </div>

      {/* Recent Activity Table */}
      <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex items-center gap-2">
          <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
          <h2 className="font-bold text-white text-sm uppercase tracking-wider">Recent Activity</h2>
        </div>
        <table className="w-full">
          <thead className="text-[10px] text-gray-500 uppercase bg-[#0f172a]">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Customer</th>
              <th className="px-6 py-4 text-left font-medium">Total</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data?.recentOrders.map((order, idx) => (
              <tr key={idx} className="hover:bg-[#1f293750] transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                    {order.firstName?.charAt(0)}{order.lastName?.charAt(0)}
                  </div>
                  <span className="text-sm font-semibold text-gray-200">{order.firstName} {order.lastName}</span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-white font-mono">Rs {order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-4 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${
                    order.paymentStatus === 'PAID' 
                      ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                      : order.paymentStatus === 'CANCELLED'
                      ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                  }`}>
                    • {order.paymentStatus || 'PENDING'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;