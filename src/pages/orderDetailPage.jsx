import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, Package, MapPin, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const API = import.meta.env.VITE_API_URL || "http://localhost:5006";

    useEffect(() => {
        const fetchOrder = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`${API}/api/orders/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setOrder(res.data);
            } catch (err) { console.error("Error fetching order:", err); } 
            finally { setLoading(false); }
        };
        fetchOrder();
    }, [id, API]);

    if (loading) return <div className="min-h-screen bg-[#FAF7F6] flex items-center justify-center text-gray-400 font-bold">Loading...</div>;

    return (
        <div className="bg-[#FAF7F6] min-h-screen font-sans text-[#2D3E50]">
            <Header />
            <div className="max-w-[800px] mx-auto p-6 py-12">
                <button 
                    onClick={() => navigate('/profile', { state: { activeTab: 'Orders' } })} 
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8 hover:text-[#E24C63]"
                >
                    <ChevronLeft size={14}/> Back to My Orders
                </button>
                
                <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-rose-50/50">
                    <div className="flex justify-between items-start mb-10 border-b pb-8">
                        <div>
                            <h1 className="text-2xl font-black mb-2">Order Details</h1>
                            <p className="text-[11px] text-gray-400 font-bold tracking-tight">ID: #{order?._id}</p>
                        </div>
                        <span className="bg-rose-50 text-[#E24C63] px-4 py-1 rounded-full text-[9px] font-black uppercase">{order?.status}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest"><MapPin size={14}/> Shipping</h3>
                            <div className="bg-[#FAF7F6] p-5 rounded-2xl text-xs font-bold text-gray-500">
                                {order?.shippingAddress?.addressLine}, {order?.shippingAddress?.city}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="flex items-center gap-2 text-[11px] font-black text-gray-400 uppercase tracking-widest"><CreditCard size={14}/> Payment</h3>
                            <div className="bg-[#FAF7F6] p-5 rounded-2xl text-xs font-bold text-green-600">Paid Successfully</div>
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[24px] p-8 text-white flex justify-between items-center">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Paid</p>
                        <p className="text-3xl font-black">Rs {order?.totalAmount}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderDetails;