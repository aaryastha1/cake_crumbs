// import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useCart } from "../context/cartContext";
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import { Clock, CheckCircle2 } from "lucide-react";

// const Checkout = () => {
//   const { cart } = useCart();
//   const location = useLocation();
  
//   const buyNowProduct = location.state?.buyNowProduct;
//   const displayItems = buyNowProduct ? [buyNowProduct] : cart;

//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("COD");
//   const [selectedSlot, setSelectedSlot] = useState("07:00 AM - 09:00 AM");

//   const shippingCharge = 150;
//   const subtotal = displayItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//   const total = subtotal + shippingCharge;

//   const paymentOptions = [
//     { id: 'E-Sewa', label: 'E-Sewa' },
//     { id: 'Phone Pay', label: 'Phone Pay' },
//     { id: 'COD', label: 'Cash on Delivery' }
//   ];

//   const timeSlots = [
//     { id: "slot1", time: "10:00 AM - 12:00 AM" },
//     { id: "slot2", time: "1:00 PM - 3:00 PM" },
//     { id: "slot3", time: "4:00 PM - 6:00 PM" },
//     { id: "slot4", time: "6:00 PM - 8:00 PM" },
//   ];

//   // FIXED: Added check for Base64 Data URLs to prevent broken images
//   const normalizeImageUrl = (url) => {
//     if (!url) return "https://placehold.co/200x200?text=Cake";
    
//     // If it's a 3D Snapshot (Base64), return it exactly as is
//     if (url.startsWith("data:image")) return url;
    
//     // 1. Replace backslashes with forward slashes
//     let newUrl = url.replace(/\\/g, "/");
    
//     // 2. If it's a relative path, prepend the server URL
//     if (!newUrl.startsWith("http")) {
//       newUrl = `http://localhost:5006/${newUrl.replace(/^\//, "")}`;
//     }
    
//     // 3. Remove any double slashes (except after http:)
//     return newUrl.replace(/([^:]\/)\/+/g, "$1");
//   };

//   return (
//     <div className="bg-[#FAF7F6] min-h-screen font-sans">
//       <Header />

//       <div className="max-w-[1000px] mx-auto p-4 lg:px-6 py-6">
//         <h1 className="text-2xl font-black mb-6 text-slate-800 tracking-tight">Checkout</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
//           {/* LEFT: Shipping, Schedule, Payment */}
//           <div className="lg:col-span-7 space-y-8">
//             {/* Shipping Details */}
//             <section>
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</span>
//                 <h2 className="text-lg font-bold text-slate-800">Shipping Details</h2>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
//                   <input type="text" placeholder="John" className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 shadow-sm" />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
//                   <input type="text" placeholder="Doe" className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 shadow-sm" />
//                 </div>
//                 <div className="md:col-span-2 flex flex-col gap-1">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Address</label>
//                   <input type="text" placeholder="Street, Apartment, City" className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 shadow-sm" />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
//                   <input type="tel" placeholder="+977" className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 shadow-sm" />
//                 </div>
//                 <div className="flex flex-col gap-1">
//                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</label>
//                   <input type="email" placeholder="john@example.com" className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-rose-200 shadow-sm" />
//                 </div>
//               </div>
//             </section>

//             {/* Schedule Delivery */}
//             <section>
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</span>
//                 <h2 className="text-lg font-bold text-slate-800">Schedule</h2>
//               </div>
//               <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
//                 <input 
//                   type="date" 
//                   onChange={(e) => setDeliveryDate(e.target.value)}
//                   className="w-full p-2.5 bg-slate-50 border-none rounded-xl font-bold text-slate-700 text-sm outline-none mb-4"
//                 />
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {timeSlots.map((slot, idx) => (
//                     <div
//                       key={`${slot.id}-${idx}`}
//                       onClick={() => setSelectedSlot(slot.time)}
//                       className={`p-3 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${
//                         selectedSlot === slot.time 
//                           ? "bg-rose-50/50 border-rose-100 ring-1 ring-rose-200" 
//                           : "bg-slate-50 border-slate-100 hover:border-slate-200"
//                       }`}
//                     >
//                       <Clock size={16} className={selectedSlot === slot.time ? "text-[#E24C63]" : "text-slate-400"} />
//                       <span className={`text-[10px] font-black uppercase tracking-tighter ${
//                         selectedSlot === slot.time ? "text-[#E24C63]" : "text-slate-500"
//                       }`}>
//                         {slot.time}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </section>

//             {/* Payment Method */}
//             <section>
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</span>
//                 <h2 className="text-lg font-bold text-slate-800">Payment Method</h2>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                 {paymentOptions.map((option, idx) => (
//                   <div
//                     key={`${option.id}-${idx}`}
//                     onClick={() => setPaymentMethod(option.id)}
//                     className={`relative flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${
//                       paymentMethod === option.id 
//                         ? "border-[#E24C63] bg-rose-50/30 shadow-md" 
//                         : "border-slate-100 bg-white hover:border-rose-100"
//                     }`}
//                   >
//                     {paymentMethod === option.id && (
//                       <div className="absolute top-2 right-2 text-[#E24C63]">
//                         <CheckCircle2 size={14} />
//                       </div>
//                     )}
//                     <span className={`font-bold text-xs mb-1 ${paymentMethod === option.id ? "text-[#E24C63]" : "text-slate-700"}`}>
//                       {option.label}
//                     </span>
//                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
//                       {paymentMethod === option.id ? "Selected" : "Select"}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>

//           {/* RIGHT: Order Summary */}
//           <div className="lg:col-span-5">
//             <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-rose-100/30 sticky top-24 border border-rose-50/50">
//               <h2 className="text-lg font-black text-slate-800 mb-5 tracking-tight">Order Summary</h2>
              
//               <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
//                 {displayItems.map((item, idx) => {
//                   // Determine image source based on context or direct Buy Now object
//                   const imageSrc = item.image || item.product?.image || item.item?.image;

//                   return (
//                     <div
//                       key={`${item._id || item.id || "item"}-${idx}`}
//                       className="flex gap-4 items-center"
//                     >
//                       <div className="relative flex-shrink-0">
//                         <img
//                           src={normalizeImageUrl(imageSrc)}
//                           className="w-14 h-14 rounded-xl object-cover bg-slate-50 border border-slate-100"
//                           alt={item.name}
//                           onError={(e) => { e.target.src = "https://placehold.co/200x200?text=Cake"; }}
//                         />
//                         <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
//                           {item.quantity}
//                         </span>
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-bold text-slate-800 text-xs truncate leading-tight">{item.name}</h4>
//                         {item.selectedSize && (
//                            <p className="text-[9px] text-slate-400 truncate mt-0.5">{item.selectedSize}</p>
//                         )}
//                         <p className="text-[#E24C63] font-black text-sm">Rs {item.price * item.quantity}</p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="space-y-2 pt-4 border-t border-dashed border-slate-200">
//                 <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest">
//                   <span>Subtotal</span>
//                   <span>Rs {subtotal}</span>
//                 </div>
//                 <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest">
//                   <span>Shipping</span>
//                   <span>Rs {shippingCharge}</span>
//                 </div>
//                 <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t border-slate-100 mt-2">
//                   <span className="tracking-tighter font-serif italic">Total</span>
//                   <span className="tracking-tighter">Rs {total}</span>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <label className="flex gap-3 cursor-pointer mb-5 items-start">
//                   <input type="checkbox" className="mt-0.5 w-3.5 h-3.5 rounded border-slate-200 text-[#E24C63]" />
//                   <span className="text-[10px] text-slate-400 font-medium leading-tight">
//                     Agree to <span className="text-slate-900 font-bold underline">Terms & Conditions</span>.
//                   </span>
//                 </label>
                
//                 <button className="w-full bg-[#E24C63] text-white py-4 rounded-xl font-black uppercase tracking-[0.1em] text-[11px] hover:brightness-105 active:scale-[0.98] transition-all shadow-lg shadow-rose-100">
//                   Confirm Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Checkout;



import React, { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { AuthContext } from "../auth/AuthContext"; // Import AuthContext to get token
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Clock, CheckCircle2 } from "lucide-react";
import axios from "axios";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { token } = useContext(AuthContext); // Use token from context
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowProduct = location.state?.buyNowProduct;
  const displayItems = buyNowProduct ? [buyNowProduct] : cart;

  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedSlot, setSelectedSlot] = useState("10:00 AM - 12:00 AM");
  const [loading, setLoading] = useState(false);

  const shippingCharge = 150;
  const subtotal = displayItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCharge;

  const paymentOptions = [
    { id: "ESEWA", label: "E-Sewa" },
    { id: "PHONEPAY", label: "Phone Pay" },
    { id: "COD", label: "Cash on Delivery" },
  ];

  const timeSlots = [
    { id: "slot1", time: "10:00 AM - 12:00 AM" },
    { id: "slot2", time: "1:00 PM - 3:00 PM" },
    { id: "slot3", time: "4:00 PM - 6:00 PM" },
    { id: "slot4", time: "6:00 PM - 8:00 PM" },
  ];

  const normalizeImageUrl = (url) => {
    if (!url) return "https://placehold.co/200x200?text=Cake";
    if (url.startsWith("data:image")) return url;
    let newUrl = url.replace(/\\/g, "/");
    if (!newUrl.startsWith("http")) {
      newUrl = `http://localhost:5006/${newUrl.replace(/^\//, "")}`;
    }
    return newUrl.replace(/([^:]\/)\/+/g, "$1");
  };

  const handleConfirmOrder = async () => {
    // 1. Validation
    if (!firstName || !lastName || !address || !phone || !deliveryDate) {
      alert("Please fill all required details (Name, Address, Phone, and Date).");
      return;
    }

    const currentToken = token || localStorage.getItem("token");
    if (!currentToken) {
      alert("Please login to place an order.");
      navigate("/login");
      return;
    }

    // 2. Prepare Data (Match Backend Expectations exactly)
   const orderData = {
    items: displayItems.map((item) => ({
      // Ensure we are grabbing the correct name and ID
      productId: item.productId || item._id || item.id,
      name: item.name || (item.item && item.item.name), 
      quantity: item.quantity,
      price: item.price,
      // Pass the relative path if possible
      image: item.image?.replace("http://localhost:5006/", "") || "",
      selectedSize: item.selectedSize || null,
    })),
      subtotal,
      shipping: shippingCharge,
      total,
      firstName,
      lastName,
      address,
      phone,
      email,
      scheduleDate: deliveryDate,
      scheduleTime: selectedSlot,
      paymentMethod,
    };

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5006/api/payment/esewa/initiate",
        orderData,
        {
          headers: { Authorization: `Bearer ${currentToken}` },
        }
      );

      // 3. Handle eSewa Redirection
      if (paymentMethod === "ESEWA" && res.data.esewaFormData) {
        const { esewaFormData } = res.data;
        
        // eSewa V2 Form Submission
        const form = document.createElement("form");
        form.method = "POST";
        // Ensure this matches your backend environment (Test vs Live)
        form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

        Object.keys(esewaFormData).forEach((key) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = esewaFormData[key];
          form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        // 4. Handle COD / Other Success
        await clearCart();
        navigate("/payment-success");
      }
    } catch (err) {
      console.error("Order error:", err);
      const errorMsg = err.response?.data?.message || "Order failed. Please try again.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F6] min-h-screen font-sans">
      <Header />
      <div className="max-w-[1000px] mx-auto p-4 lg:px-6 py-6">
        <h1 className="text-2xl font-black mb-6 text-slate-800 tracking-tight">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Shipping */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</span>
                <h2 className="text-lg font-bold text-slate-800">Shipping Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">First Name</label>
                  <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none shadow-sm" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Last Name</label>
                  <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none shadow-sm" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Address</label>
                  <input type="text" placeholder="Street, Apartment, City" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none shadow-sm" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</label>
                  <input type="tel" placeholder="+977" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none shadow-sm" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email</label>
                  <input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white border border-slate-100 rounded-lg p-3 text-sm focus:outline-none shadow-sm" />
                </div>
              </div>
            </section>

            {/* Step 2: Schedule */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</span>
                <h2 className="text-lg font-bold text-slate-800">Schedule</h2>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <input 
                  type="date" 
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border-none rounded-xl font-bold text-slate-700 text-sm outline-none mb-4"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`p-3 rounded-xl border transition-all flex items-center gap-3 cursor-pointer ${selectedSlot === slot.time ? "bg-rose-50/50 border-rose-100 ring-1 ring-rose-200" : "bg-slate-50 border-slate-100 hover:border-slate-200"}`}
                    >
                      <Clock size={16} className={selectedSlot === slot.time ? "text-[#E24C63]" : "text-slate-400"} />
                      <span className={`text-[10px] font-black uppercase tracking-tighter ${selectedSlot === slot.time ? "text-[#E24C63]" : "text-slate-500"}`}>{slot.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-slate-900 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</span>
                <h2 className="text-lg font-bold text-slate-800">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {paymentOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => setPaymentMethod(option.id)}
                    className={`relative flex flex-col items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${paymentMethod === option.id ? "border-[#E24C63] bg-rose-50/30 shadow-md" : "border-slate-100 bg-white hover:border-rose-100"}`}
                  >
                    {paymentMethod === option.id && (
                      <div className="absolute top-2 right-2 text-[#E24C63]">
                        <CheckCircle2 size={14} />
                      </div>
                    )}
                    <span className={`font-bold text-xs mb-1 ${paymentMethod === option.id ? "text-[#E24C63]" : "text-slate-700"}`}>{option.label}</span>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{paymentMethod === option.id ? "Selected" : "Select"}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2rem] p-6 shadow-xl shadow-rose-100/30 sticky top-24 border border-rose-50/50">
              <h2 className="text-lg font-black text-slate-800 mb-5 tracking-tight">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                {displayItems.map((item, idx) => (
                  <div key={`${item._id || item.id}-${idx}`} className="flex gap-4 items-center">
                    <div className="relative flex-shrink-0">
                      <img src={normalizeImageUrl(item.image)} className="w-14 h-14 rounded-xl object-cover bg-slate-50 border border-slate-100" alt={item.name} />
                      <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[9px] font-bold w-5 h-5 flex items-center justify-center rounded-full">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-800 text-xs truncate leading-tight">{item.name}</h4>
                      {item.selectedSize && (<p className="text-[9px] text-slate-400 truncate mt-0.5">{item.selectedSize}</p>)}
                      <p className="text-[#E24C63] font-black text-sm">Rs {item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-4 border-t border-dashed border-slate-200">
                <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest"><span>Subtotal</span><span>Rs {subtotal}</span></div>
                <div className="flex justify-between text-slate-500 font-bold text-[10px] uppercase tracking-widest"><span>Shipping</span><span>Rs {shippingCharge}</span></div>
                <div className="flex justify-between text-xl font-black text-slate-900 pt-3 border-t border-slate-100 mt-2">
                  <span className="tracking-tighter italic">Total</span>
                  <span className="tracking-tighter">Rs {total}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={handleConfirmOrder}
                  disabled={loading}
                  className="w-full bg-[#E24C63] text-white py-4 rounded-xl font-black uppercase tracking-[0.1em] text-[11px] hover:brightness-105 active:scale-[0.98] transition-all shadow-lg disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Confirm Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;