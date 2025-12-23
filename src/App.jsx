import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { FavoritesProvider } from "./context/favoriteContext";
import AppRoutes from "./routers/AppRoutes";

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <AppRoutes />
        </FavoritesProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
