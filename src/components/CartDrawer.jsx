import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { useCart } from "../context/cartContext";
import { Trash2, X, Minus, Plus, ShoppingBag } from "lucide-react";

const CartDrawer = () => {
  const navigate = useNavigate(); // 2. Initialize navigate
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price || 0) * item.quantity,
    0
  );
  const shippingCharge = cart.length > 0 ? 150 : 0;
  const grandTotal = subtotal + shippingCharge;

  const formatPrice = (amount) => `Rs ${amount.toLocaleString()}`;

  const normalizeImageUrl = (url) => {
    if (!url) return "https://placehold.co/200x200?text=Cake";


    if (url.startsWith("data:image")) return url;
    
    let newUrl = url.replace(/\\/g, "/");
    newUrl = newUrl.replace(/([^:]\/)\/+/g, "$1");
    return newUrl;
  };

  // 3. Navigation function
  const handleCheckout = () => {
    setIsCartOpen(false); // Close the drawer first
    navigate("/checkout"); // Navigate to checkout page
  };

  return (
    <>
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[60]"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[360px] bg-white shadow-2xl z-[70] transition-transform duration-500 ease-in-out flex flex-col ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 flex justify-between items-center border-b border-gray-50">
          <div className="flex items-center gap-2.5">
            <div className="bg-pink-50 p-2 rounded-full">
              <ShoppingBag size={18} className="text-[#ff4c8a]" />
            </div>
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Your Bag
            </h2>
            <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">
              {cart.length} {cart.length === 1 ? "Item" : "Items"}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-slate-50 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={32} className="text-slate-200 mb-2" />
              <p className="text-slate-400 text-sm font-medium">
                Your bag is empty.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => {
              const product = item.item || {};
              const pId = product._id || item.product;
              const size = item.selectedSize || "";
              const price = item.price || 0;
              const name = product.name || item.name || "Item";
              const imageUrl = normalizeImageUrl(item.image);

              return (
                <div key={`${pId}-${size}-${idx}`} className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100 shadow-sm">
                    <img
                      src={imageUrl}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-sm text-slate-800 truncate">
                          {name}
                        </h3>
                        {size && (
                          <span className="text-[10px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded font-bold uppercase">
                            {size}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => removeFromCart(pId, size, item.itemType)}
                        className="text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(pId, size, item.quantity - 1, item.itemType)
                          }
                          disabled={item.quantity <= 1}
                          className="px-3 py-2 bg-black text-white hover:bg-gray-800 disabled:opacity-30 transition-colors"
                        >
                          <Minus size={14} strokeWidth={3} />
                        </button>

                        <span className="px-4 py-2 font-bold text-black bg-white min-w-[40px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(pId, size, item.quantity + 1, item.itemType)
                          }
                          className="px-3 py-2 bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>

                      <span className="font-bold text-[#ff4c8a] text-sm ml-4">
                        {formatPrice(price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-50 bg-slate-50/40">
            <div className="flex justify-between text-slate-500 text-xs font-medium mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500 text-xs font-medium mb-2">
              <span>Delivery</span>
              <span>{formatPrice(shippingCharge)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-slate-800 pt-2 border-t border-dashed border-slate-200 mb-4">
              <span>Grand Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
            
            {/* 4. Attach handleCheckout to onClick */}
           <button 
  onClick={handleCheckout}
  className="w-full bg-[#E24C63] text-white py-4 rounded-2xl font-black uppercase text-xs tracking-[0.15em] shadow-lg active:scale-95 transition-transform"
>
  Checkout Now
</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;