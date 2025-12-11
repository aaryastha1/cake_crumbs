// Register.jsx
import React, { useState } from "react";
import MainLayout from "../layouts/MainLayout"; 
import { registerUser } from "../services/userService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRegistrationSuccess(false);
    try {
      const response = await registerUser(formData);
      console.log("Registration successful:", response.data);
      setRegistrationSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // short delay to see success banner
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(
        "Registration failed: " +
          (err.response?.data?.message || "Please check your input")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-md mx-auto my-12 font-serif-tnr">
        
        <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

        {/* Success Banner */}
        <div 
          className={`flex items-center justify-center p-2 mb-4 rounded-md text-sm font-bold transition-all duration-300 
                      ${registrationSuccess 
                          ? 'bg-green-100 text-green-700 border border-green-300 opacity-100' 
                          : 'opacity-0 h-0 p-0 overflow-hidden'
                      }`}
        >
          <span className="mr-2 text-lg">✅</span> Register Successful!
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-500"
            style={{ backgroundColor: '#ffeef2', border: 'none' }}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="p-3 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 placeholder-gray-500"
            style={{ backgroundColor: '#ffeef2', border: 'none' }}
          />
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
          {/* Phone Number Input */}
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
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

          <button
            type="submit"
            disabled={loading}
            className="text-white py-2 rounded-md font-semibold transition hover:bg-purple-800 mt-2 text-sm"
            style={{ backgroundColor: '#6a5acd' }}
          >
            {loading ? "REGISTERING..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-4 text-xs">
          Already have an account? 
          <Link to="/login" className="text-purple-700 font-semibold ml-1 hover:underline">
            Signin
          </Link>
        </p>
      </div>
    </MainLayout>
  );
};

export default Register;
