// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   useCallback,
// } from "react";
// import axiosClient from "../api/axiosClient";
// import toast from "react-hot-toast";

// const CartContext = createContext();
// export const useCart = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // ================= FETCH CART =================
//   const fetchCart = useCallback(async () => {
//     try {
//       const res = await axiosClient.get("/cart");
//       setCart(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       if (err.response?.status === 401) setCart([]);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   // ================= ADD =================
//   const addToCart = async (
//     itemId,
//     selectedSize = "",
//     quantity = 1,
//     itemType = "Product",
//     price = 0,
//     name = "Item",
//   ) => {
//     if (!itemId) return toast.error("Item missing");

//     setCart(prev => {
//       const existing = prev.find(
//         i =>
//           (i.product?._id || i.product) === itemId &&
//           (i.selectedSize || "") === selectedSize &&
//           i.itemType === itemType
//       );

//       if (existing) {
//         return prev.map(item =>
//           (item.product?._id || item.product) === itemId &&
//           (item.selectedSize || "") === selectedSize &&
//           item.itemType === itemType
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }

//       return [
//         ...prev,
//         {
//           product: itemId,
//           selectedSize,
//           quantity,
//           price,
//           name,
//           itemType,
//         },
//       ];
//     });

//     try {
//       await axiosClient.post("/cart/add", {
//         itemId,
//         itemType,
//         size: selectedSize,
//         quantity,
//       });
//       await fetchCart();
//       setIsCartOpen(true);
//     } catch {
//       fetchCart();
//     }
//   };

//   // ================= QUANTITY =================
//   const updateQuantity = async (
//     itemId,
//     size = "",
//     newQuantity,
//     itemType
//   ) => {
//     if (newQuantity < 1) return;

//     setCart(prev =>
//       prev.map(item => {
//         const id = item.product?._id || item.product;
//         if (
//           id === itemId &&
//           (item.selectedSize || "") === size &&
//           item.itemType === itemType
//         ) {
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       })
//     );

//     try {
//       await axiosClient.post("/cart/add", {
//         itemId,
//         itemType,
//         size,
//         quantity: newQuantity,
//         replace: true,
//       });
//       await fetchCart();
//     } catch {
//       fetchCart();
//     }
//   };

//   // ================= REMOVE =================
//   const removeFromCart = async (itemId, size = "", itemType) => {
//     setCart(prev =>
//       prev.filter(item => {
//         const id = item.product?._id || item.product;
//         return !(
//           id === itemId &&
//           (item.selectedSize || "") === size &&
//           item.itemType === itemType
//         );
//       })
//     );

//     try {
//       await axiosClient.delete(
//         `/cart/remove/${itemId}/${itemType}?size=${encodeURIComponent(
//           size || ""
//         )}`
//       );
//       await fetchCart();
//     } catch {
//       fetchCart();
//     }
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         isCartOpen,
//         setIsCartOpen,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         fetchCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axiosClient from "../api/axiosClient";
import toast from "react-hot-toast";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper to get headers (Internal use)
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  };

  // ================= FETCH CART =================
  const fetchCart = useCallback(async () => {
    const localCakes = JSON.parse(localStorage.getItem("local_custom_cakes") || "[]");
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, we only show local storage items
      setCart(localCakes);
      return;
    }

    try {
      const res = await axiosClient.get("/cart", getAuthHeaders());
      const serverCart = Array.isArray(res.data) ? res.data : [];
      setCart([...serverCart, ...localCakes]);
    } catch (err) {
      if (err.response?.status === 401) {
        setCart(localCakes);
      }
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ================= ADD =================
  const addToCart = async (
    itemId,
    selectedSize = "",
    quantity = 1,
    itemType = "Product",
    price = 0,
    name = "Item",
    image = ""
  ) => {
    if (!itemId) return toast.error("Item missing");

    const cartItemData = {
      product: itemId,
      selectedSize,
      quantity,
      price,
      name,
      itemType,
      image,
    };

    // Optimistic UI Update
    setCart(prev => {
      const existing = prev.find(
        i =>
          (i.product?._id || i.product) === itemId &&
          (i.selectedSize || "") === selectedSize &&
          i.itemType === itemType
      );

      if (existing) {
        return prev.map(item =>
          (item.product?._id || item.product) === itemId &&
          (item.selectedSize || "") === selectedSize &&
          item.itemType === itemType
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, cartItemData];
    });

    if (itemType === "CustomCake") {
      const existingLocal = JSON.parse(localStorage.getItem("local_custom_cakes") || "[]");
      localStorage.setItem("local_custom_cakes", JSON.stringify([...existingLocal, cartItemData]));
      setIsCartOpen(true);
      toast.success("Added to cart!");
      return; 
    }

    try {
      await axiosClient.post("/cart/add", {
        itemId,
        itemType,
        size: selectedSize,
        quantity,
      }, getAuthHeaders());
      await fetchCart();
      setIsCartOpen(true);
    } catch {
      fetchCart();
    }
  };

  // ================= QUANTITY =================
  const updateQuantity = async (itemId, size = "", newQuantity, itemType) => {
    if (newQuantity < 1) return;

    setCart(prev =>
      prev.map(item => {
        const id = item.product?._id || item.product;
        if (id === itemId && (item.selectedSize || "") === size && item.itemType === itemType) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );

    if (itemType === "CustomCake") {
      const existingLocal = JSON.parse(localStorage.getItem("local_custom_cakes") || "[]");
      const updatedLocal = existingLocal.map(item => 
        (item.product === itemId && item.selectedSize === size) 
        ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem("local_custom_cakes", JSON.stringify(updatedLocal));
      return;
    }

    try {
      await axiosClient.post("/cart/add", {
        itemId,
        itemType,
        size,
        quantity: newQuantity,
        replace: true,
      }, getAuthHeaders());
      await fetchCart();
    } catch {
      fetchCart();
    }
  };

  // ================= REMOVE =================
  const removeFromCart = async (itemId, size = "", itemType) => {
    setCart(prev =>
      prev.filter(item => {
        const id = item.product?._id || item.product;
        return !(id === itemId && (item.selectedSize || "") === size && item.itemType === itemType);
      })
    );

    if (itemType === "CustomCake") {
      const existingLocal = JSON.parse(localStorage.getItem("local_custom_cakes") || "[]");
      const filteredLocal = existingLocal.filter(item => 
        !(item.product === itemId && item.selectedSize === size)
      );
      localStorage.setItem("local_custom_cakes", JSON.stringify(filteredLocal));
      return;
    }

    try {
      await axiosClient.delete(
        `/cart/remove/${itemId}/${itemType}?size=${encodeURIComponent(size || "")}`,
        getAuthHeaders()
      );
      await fetchCart();
    } catch {
      fetchCart();
    }
  };

  // ================= CLEAR CART =================
  const clearCart = async () => {
    setCart([]); 
    localStorage.removeItem("local_custom_cakes"); 
    
    const token = localStorage.getItem("token");
    if (!token) return; // Silent return if guest

    try {
      await axiosClient.delete("/cart/clear", getAuthHeaders()); 
    } catch (err) {
      console.error("Cart clear error", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        fetchCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};