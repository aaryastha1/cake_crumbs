// import React, { useState, useEffect } from "react";
// import { useCart } from "../context/cartContext";
// import { Plus, Minus } from "lucide-react";
// import { toast } from "react-hot-toast";

// const AddToCartButton = ({ product, sizes }) => {
//   const [selectedSize, setSelectedSize] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart } = useCart();

//   const coralRed = "#E34A5F";

//   useEffect(() => {
//     if (sizes?.length) setSelectedSize(sizes[0]);
//   }, [sizes]);

//   const handleAdd = async () => {
//     if (!product?._id) return toast.error("Product ID missing");
    
//     if (!selectedSize && sizes?.length > 0) {
//       return toast.error("Please select a size!");
//     }

//     try {
//       // Calling the context function
//       await addToCart(
//         product._id,
//         selectedSize,
//         quantity,
//         "Product",
//         product.price,
//         product.name
//       );
      
//       toast.success(`${product.name} added to bag`);
//     } catch (error) {
//       toast.error("Could not add to cart");
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       {/* Size Selection */}
//       {sizes?.length > 0 && (
//         <div className="flex flex-col gap-1.5">
//           <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
//             Choose Size
//           </label>
//           <select
//             value={selectedSize}
//             onChange={(e) => setSelectedSize(e.target.value)}
//             className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-normal text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all cursor-pointer shadow-sm"
//           >
//             {sizes.map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {/* Quantity and Button */}
//       <div className="flex items-center gap-4">
//         <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
//           <button
//             onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//             className="p-3.5 hover:bg-slate-50 text-slate-500 transition-colors disabled:opacity-30"
//             disabled={quantity <= 1}
//           >
//             <Minus size={16} strokeWidth={3} />
//           </button>

//           <span className="px-3 font-bold text-base min-w-[40px] text-center text-slate-800">
//             {quantity}
//           </span>

//           <button
//             onClick={() => setQuantity((q) => q + 1)}
//             className="p-3.5 hover:bg-slate-50 text-slate-500 transition-colors"
//           >
//             <Plus size={16} strokeWidth={3} />
//           </button>
//         </div>

//         <button
//           onClick={handleAdd}
//           style={{ backgroundColor: coralRed }}
//           className="flex-1 text-white px-8 py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.15em] shadow-lg shadow-red-100 hover:brightness-110 active:scale-[0.98] transition-all"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddToCartButton;




import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { Plus, Minus, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const AddToCartButton = ({ product, sizes }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // New state
  const { addToCart } = useCart();

  const coralRed = "#E34A5F";

  useEffect(() => {
    if (sizes?.length) setSelectedSize(sizes[0]);
  }, [sizes]);

  const handleAdd = async () => {
    if (!product?._id) return toast.error("Product ID missing");
    
    if (!selectedSize && sizes?.length > 0) {
      return toast.error("Please select a size!");
    }

    try {
      setIsLoading(true);
      await addToCart(
        product._id,
        selectedSize,
        quantity,
        "Product",
        product.price,
        product.name,
        product.image
      );
      toast.success(`${product.name} added to bag`);
    } catch (error) {
      // Error handling is now piped from context
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {sizes?.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
            Choose Size
          </label>
          <select
            disabled={isLoading}
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 font-normal text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all cursor-pointer shadow-sm disabled:opacity-50"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || isLoading}
            className="p-3.5 hover:bg-slate-50 text-slate-500 transition-colors disabled:opacity-30"
          >
            <Minus size={16} strokeWidth={3} />
          </button>
          <span className="px-3 font-bold text-base min-w-[40px] text-center text-slate-800">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            disabled={isLoading}
            className="p-3.5 hover:bg-slate-50 text-slate-500 transition-colors disabled:opacity-30"
          >
            <Plus size={16} strokeWidth={3} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          disabled={isLoading}
          style={{ backgroundColor: coralRed }}
          className="flex-1 text-white px-8 py-4 rounded-xl font-black uppercase text-[11px] tracking-[0.15em] shadow-lg shadow-red-100 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default AddToCartButton;