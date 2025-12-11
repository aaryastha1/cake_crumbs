import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const safeParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error("Error parsing JSON:", e);
      return null;
    }
  };

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(() =>
    safeParse(localStorage.getItem("user"))
  );

  useEffect(() => {
    if (token) {
      const storedUser = safeParse(localStorage.getItem("user"));
      setUser(storedUser);
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
