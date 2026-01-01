import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { loginUser } from "../services/userService";
import useAuth from "../hooks/useAuth";
import { useCart } from "../context/cartContext"; // ✅ Added
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const { fetchCart } = useCart(); // ✅ Access cart fetcher
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser(formData);
      
      // 1. This now updates localStorage INSTANTLY
      login(res.data.user, res.data.token);
      
      // 2. We wait for the cart to load before moving to the home page
      // Because storage is updated, the axiosClient interceptor will find the token.
      await fetchCart(); 

      alert("Login successful!");
      navigate("/home"); 
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        "Login failed: " +
          (err.response?.data?.message || "Check your email and password")
      );
    } finally {
      setLoading(false);
    }
  };

  // --- Design Styles ---
  const primaryPink = "#ff4c8a";
  const secondaryPink = "#b23a7e";
  const cardGradientBackground = { background: "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 240, 0.95) 100%)" };
  const mainBackgroundColor = { background: "linear-gradient(135deg, #FFDDE1 0%, #E9E4F0 50%, #FFECD2 100%)" };
  const buttonStyle = { background: `linear-gradient(90deg, ${primaryPink} 0%, ${secondaryPink} 100%)`, boxShadow: "0 4px 8px rgba(178, 58, 126, 0.2)", fontSize: "0.875rem", padding: "10px" };
  const googleButtonStyle = { backgroundColor: "white", border: "1px solid #ddd", color: "#4285f4", fontWeight: "bold", boxShadow: "0 2px 5px rgba(0,0,0,0.1)", fontSize: "0.875rem", padding: "10px" };
  const inputStyle = { backgroundColor: "#ffeef2", border: "1px solid #f5c0d0", padding: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.05) inset" };

  return (
    <div className="min-h-screen flex flex-col" style={mainBackgroundColor}>
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="relative z-10 w-full max-w-sm p-8 rounded-2xl shadow-2xl" style={cardGradientBackground}>
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-bold mb-1" style={{ color: secondaryPink }}>Login now</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400" style={inputStyle} />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400" style={inputStyle} />
            <div className="relative flex justify-center items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-2 text-gray-500 text-xs font-medium">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button type="button" className="w-full rounded-xl flex items-center justify-center transition hover:bg-gray-50" style={googleButtonStyle} onClick={() => alert("Integrating with Google...")}>
              <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
              Login with Google
            </button>
            <button type="submit" disabled={loading} className="w-full rounded-xl text-white font-bold transition hover:opacity-90" style={buttonStyle}>
              {loading ? "LOGGING IN..." : "Login"}
            </button>
          </form>
          <p className="text-center mt-4 text-sm text-gray-600">
            Don't have an account? <Link to="/register" className="font-bold ml-1 hover:underline" style={{ color: primaryPink }}>Register</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;