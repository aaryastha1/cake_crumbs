import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user") || "null");
      const savedToken = localStorage.getItem("token") || null;
      if (savedUser) setUser(savedUser);
      if (savedToken) setToken(savedToken);
    } catch (err) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);


  const login = (userData, tokenData) => {
   
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenData);
    setUser(userData);
    setToken(tokenData);
    
 
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear(); // Clears everything including user, token, and potentially cart status
    navigate("/");
    window.location.reload(); // Ensures all context states reset
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};