// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import { AuthProvider } from "./auth/AuthContext";
// import { FavoritesProvider } from "./context/favoriteContext";
// import AppRoutes from "./routers/AppRoutes";
// import { Toaster } from "react-hot-toast"; // Added from your dependencies

// function App() {
//   return (
//     // Added future flags to fix the warning
//     <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
//       <AuthProvider>
//         <FavoritesProvider>
          
//           {/* Toaster allows your customizer to show error/success alerts */}
//           <Toaster position="top-center" /> 
//           <AppRoutes />
//         </FavoritesProvider>
//       </AuthProvider>
//     </Router>
//   );
// }

// export default App;




import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { FavoritesProvider } from "./context/favoriteContext";
import { CartProvider } from "./context/cartContext"; // Import the Cart Context
import AppRoutes from "./routers/AppRoutes";
import { Toaster } from "react-hot-toast";
import CartDrawer from "./components/CartDrawer"; // Import your new Drawer component

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        {/* CartProvider must wrap AppRoutes and CartDrawer to share data */}
        <CartProvider>
          <FavoritesProvider>
            
            {/* Toaster for premium notifications */}
            <Toaster position="top-center" /> 
            
            {/* The global Cart Drawer - now has access to useCart() */}
            <CartDrawer /> 
            
            <AppRoutes />
            
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;