// Login.jsx
import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { loginUser } from "../services/userService";
import useAuth from "./../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
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
      login(res.data.user, res.data.token);
      alert("Login successful!");
      navigate("/"); // redirect after login
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

  return (
    <MainLayout>
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md mx-auto my-12 font-serif-tnr">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-500"
            style={{ backgroundColor: '#ffeef2', border: 'none' }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-500"
            style={{ backgroundColor: '#ffeef2', border: 'none' }}
          />

          <p className="text-center text-xs text-gray-500 my-1">or login with</p>

          <button
            type="button"
            className="flex items-center justify-center p-2 rounded-md text-gray-700 text-sm font-medium transition hover:bg-red-50"
            style={{ backgroundColor: '#fcecec', border: '1px solid #f9d8e5' }}
          >
            <img 
              src="https://img.icons8.com/color/24/000000/google-logo.png" 
              alt="Google" 
              className="w-4 h-4 mr-2" 
            />
            Login with Google
          </button>

          <button
            type="submit"
            disabled={loading}
            className="text-white py-2 rounded-md font-semibold transition hover:bg-purple-800 mt-2 text-sm"
            style={{ backgroundColor: '#6a5acd' }}
          >
            {loading ? "LOGGING IN..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-xs">
          Don't have an account? 
          <Link to="/register" className="text-purple-700 font-semibold ml-1 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default Login;
