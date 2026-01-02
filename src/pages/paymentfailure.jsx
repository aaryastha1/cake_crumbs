import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, RefreshCcw } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans">
      <Header />
      <div className="max-w-[500px] mx-auto pt-20 pb-12 px-6">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-rose-100/40 border border-rose-50/50 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-rose-50 p-4 rounded-full">
              <XCircle size={60} className="text-[#E24C63]" />
            </div>
          </div>
          
          <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Payment Failed</h1>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Something went wrong with your transaction. Don't worry, no money was deducted. Please try again.
          </p>

          <div className="space-y-3">
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#E24C63] text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:brightness-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-100"
            >
              <RefreshCcw size={16} />
              Try Again
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-white text-slate-400 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-all"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentFailed;