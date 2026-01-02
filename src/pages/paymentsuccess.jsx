import React, { useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from "../context/cartContext"; // 1. Import useCart hook

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart(); // 2. Get clearCart from context

  useEffect(() => {
    // 3. This will clear the backend cart, local custom cakes, 
    // and the UI state as soon as the page loads
    clearCart();
  }, []); // Empty array means it only runs once

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans flex flex-col items-center justify-center">
      <div className="max-w-[500px] w-full p-6">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl text-center border border-rose-50/50">
          <div className="flex justify-center mb-6">
            <div className="bg-green-50 p-4 rounded-full">
              <CheckCircle2 size={60} className="text-green-500" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-2">Payment Successful!</h1>
          <p className="text-slate-500 text-sm mb-8">
            Your order has been confirmed and is being processed.
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/profile', { state: { activeTab: "Orders" } })} 
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} /> View My Orders
            </button>
            <button 
              onClick={() => navigate('/')} 
              className="w-full text-slate-400 py-4 font-bold uppercase text-[10px]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;