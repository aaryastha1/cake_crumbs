// Register.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
      setTimeout(() => navigate("/login"), 2000);
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

  // --- Styles ---
  const primaryPink = "#ff4c8a";
  const secondaryPink = "#b23a7e";

  const cardGradientBackground = {
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 240, 240, 0.95) 100%)",
  };
  const mainBackgroundColor = {
    background:
      "linear-gradient(135deg, #FFDDE1 0%, #E9E4F0 50%, #FFECD2 100%)",
  };
  const buttonStyle = {
    background: `linear-gradient(90deg, ${primaryPink} 0%, ${secondaryPink} 100%)`,
    boxShadow: "0 4px 8px rgba(178, 58, 126, 0.2)",
    fontSize: "0.875rem", // smaller text
    padding: "10px",       // smaller height
  };
  const googleButtonStyle = {
    backgroundColor: "white",
    border: "1px solid #ddd",
    color: "#4285f4",
    fontWeight: "bold",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    fontSize: "0.875rem",
    padding: "10px",
  };
  const inputStyle = {
    backgroundColor: "#ffeef2",
    border: "1px solid #f5c0d0",
    padding: "10px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05) inset",
  };

  return (
    <div className="min-h-screen flex flex-col" style={mainBackgroundColor}>
      <Header />

      <div className="flex-grow flex items-center justify-center p-4 relative">
        <div
          className="relative z-10 w-full max-w-sm p-8 rounded-2xl shadow-2xl"
          style={cardGradientBackground}
        >
          <div className="flex flex-col items-center mb-6">
            <h1
              className="text-3xl font-bold mb-1"
              style={{ color: secondaryPink }}
            >
              Create Account
            </h1>
            <p className="text-sm text-gray-500">
              Join our sweet community today!
            </p>
          </div>

          <div
            className={`flex items-center justify-center p-2 mb-4 rounded-md text-sm font-bold transition-all duration-300 
            ${registrationSuccess
              ? "bg-green-100 text-green-700 border border-green-300 opacity-100"
              : "opacity-0 h-0 p-0 overflow-hidden"
            }`}
          >
            <span className="mr-2 text-lg">✅</span> Register Successful!
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* First & Last Name */}
            <div className="flex gap-2">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="rounded-lg w-1/2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
                style={inputStyle}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="rounded-lg w-1/2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
                style={inputStyle}
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              style={inputStyle}
            />

            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              style={inputStyle}
            />

            {/* Password (Normal Input) */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
              style={inputStyle}
            />

            {/* OR Separator */}
            <div className="relative flex justify-center items-center my-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-2 text-gray-500 text-xs font-medium">
                OR
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Button */}
            {/* <button
              type="button"
              className="w-full rounded-xl flex items-center justify-center transition hover:bg-gray-50"
              style={googleButtonStyle}
              onClick={() => alert("Integrating with Google...")}
            >
              <img
                src="https://img.icons8.com/color/24/000000/google-logo.png"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Sign up with Google
            </button> */}

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl text-white font-bold transition hover:opacity-90"
              style={buttonStyle}
            >
              {loading ? "REGISTERING..." : "Create Account"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="font-bold ml-1 hover:underline"
              style={{ color: primaryPink }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
