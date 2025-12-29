import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { FavoritesProvider } from "./context/favoriteContext";
import AppRoutes from "./routers/AppRoutes";
import { Toaster } from "react-hot-toast"; // Added from your dependencies

function App() {
  return (
    // Added future flags to fix the warning
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <FavoritesProvider>
          {/* Toaster allows your customizer to show error/success alerts */}
          <Toaster position="top-center" /> 
          <AppRoutes />
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;