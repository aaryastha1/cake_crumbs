import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans">
      <Header />
      <div className="max-w-[500px] mx-auto pt-20 pb-12 px-6">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-rose-100/40 border border-rose-50/50 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-50 p-4 rounded-full">
              <CheckCircle2 size={60} className="text-green-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Payment Successful!</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Thank you for your purchase. Your order has been confirmed and is being processed.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => navigate('/orders')}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              View My Orders
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-white text-slate-400 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;