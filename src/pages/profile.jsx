import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../auth/AuthContext"; // ✅ IMPORTED
import {
    CheckCircle2, Save, Edit2, ShieldCheck, LogOut
} from "lucide-react";

const Profile = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext); // ✅ GET LOGOUT FROM CONTEXT
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [activeTab, setActiveTab] = useState("My Profile");
    const [isEditing, setIsEditing] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Editable profile fields
    const [formData, setFormData] = useState({ firstName: "", lastName: "", phoneNumber: "" });

    // Password fields
    const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const API = import.meta.env.VITE_API_URL || "http://localhost:5006";
    const token = localStorage.getItem("token");

    // Fetch user info
    useEffect(() => {
        const fetchProfile = async () => {
            if (!token) return setLoading(false);
            try {
                const res = await axios.get(`${API}/api/user/me`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                setFormData({ firstName: res.data.firstName, lastName: res.data.lastName, phoneNumber: res.data.phoneNumber || "" });
            } catch (err) { console.error(err); } 
            finally { setLoading(false); }
        };
        fetchProfile();
    }, [API, token]);

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return;
            setLoadingOrders(true);
            try {
                const res = await axios.get(`${API}/api/orders/my`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) { console.error(err); }
            finally { setLoadingOrders(false); }
        };
        if (activeTab === "My Orders") fetchOrders();
    }, [activeTab]);

    const handleUpdateProfile = async () => {
        try {
            const res = await axios.put(`${API}/api/user/update`, formData, { headers: { Authorization: `Bearer ${token}` } });
            setUser(res.data.user || res.data);
            setIsEditing(false);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch { alert("Failed to update profile"); }
    };

    const handleChangePassword = async () => {
        const { currentPassword, newPassword, confirmPassword } = passwordData;
        if (newPassword !== confirmPassword) return alert("Passwords do not match");
        try {
            await axios.put(`${API}/api/user/change-password`, { currentPassword, newPassword }, { headers: { Authorization: `Bearer ${token}` } });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setSuccessMessage("Password changed successfully!");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) { alert(err.response?.data?.message || "Password change failed"); }
    };

    // ✅ UPDATED: Use context logout to update Header state instantly
    const handleLogout = () => {
        logout(); // This clears context state + localStorage
        setSuccessMessage("Logged out successfully!");
        setShowLogoutModal(false);
    };

    if (loading) return <div className="p-12 text-center text-gray-400">Loading details...</div>;

    return (
        <div className="bg-[#FAF7F6] min-h-screen font-sans text-[#2D3E50] relative">
            <Header />
            <main className="max-w-[1100px] mx-auto px-6 py-12">
                {successMessage && (
                    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-[#F0FDF4] text-[#166534] py-3 px-6 rounded-full shadow-lg border border-green-100 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle2 size={18} className="text-emerald-500" />
                        <span className="font-bold text-sm">{successMessage}</span>
                    </div>
                )}

                <h1 className="text-xl font-black mb-10 uppercase tracking-tight">My Account</h1>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* SIDEBAR */}
                    <aside className="lg:w-64 space-y-1">
                        {["My Profile", "Change Password", "My Orders", "Logout"].map((name) => (
                            <button
                                key={name}
                                onClick={() => name === "Logout" ? setShowLogoutModal(true) : setActiveTab(name)}
                                className={`w-full px-5 py-3.5 rounded-xl text-left font-bold transition-all flex items-center gap-3 ${activeTab === name && name !== "Logout"
                                        ? "bg-white text-[#E24C63] shadow-sm border border-rose-50"
                                        : "text-gray-400 hover:text-[#E24C63] hover:bg-white/50"
                                    } ${name === "Logout" ? "mt-4 text-gray-400 border-t border-dashed border-gray-200 pt-4" : ""}`}
                            >
                                {name === "Logout" && <LogOut size={16} />}
                                {name}
                            </button>
                        ))}
                    </aside>

                    {/* CONTENT AREA */}
                    <div className="flex-1">
                        <div className="bg-white rounded-[32px] p-10 shadow-sm border border-rose-50/50 min-h-[400px]">
                            {/* PROFILE */}
                            {activeTab === "My Profile" && (
                                <div className="animate-in fade-in duration-300">
                                    <div className="flex justify-between items-center mb-8">
                                        <h2 className="text-lg font-black">Profile Details</h2>
                                        {!isEditing ? (
                                            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 text-xs font-black text-[#E24C63]"><Edit2 size={14} /> Edit</button>
                                        ) : (
                                            <button onClick={handleUpdateProfile} className="flex items-center gap-2 bg-[#E24C63] text-white px-5 py-2 rounded-full text-xs font-black shadow-md"><Save size={14} /> Save Changes</button>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <EditableDetail label="First Name" value={formData.firstName} isEditing={isEditing} onChange={(v) => setFormData({ ...formData, firstName: v })} />
                                        <EditableDetail label="Last Name" value={formData.lastName} isEditing={isEditing} onChange={(v) => setFormData({ ...formData, lastName: v })} />
                                        <div className="opacity-60">
                                            <label className="text-[10px] uppercase font-black text-gray-400 mb-2 block">Email</label>
                                            <div className="bg-[#FAF7F6] px-5 py-4 rounded-2xl text-sm font-bold">{user?.email}</div>
                                        </div>
                                        <EditableDetail label="Phone Number" value={formData.phoneNumber} isEditing={isEditing} onChange={(v) => setFormData({ ...formData, phoneNumber: v })} />
                                    </div>
                                </div>
                            )}

                            {/* CHANGE PASSWORD */}
                            {activeTab === "Change Password" && (
                                <div className="max-w-md animate-in fade-in duration-300">
                                    <h2 className="text-lg font-black mb-8">Change Password</h2>
                                    <PasswordInput label="Current Password" value={passwordData.currentPassword} onChange={(v) => setPasswordData({ ...passwordData, currentPassword: v })} />
                                    <PasswordInput label="New Password" value={passwordData.newPassword} onChange={(v) => setPasswordData({ ...passwordData, newPassword: v })} />
                                    <PasswordInput label="Confirm New Password" value={passwordData.confirmPassword} onChange={(v) => setPasswordData({ ...passwordData, confirmPassword: v })} />
                                    <button onClick={handleChangePassword} className="mt-6 w-full flex items-center justify-center gap-2 bg-[#E24C63] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-rose-100 hover:bg-[#c93d52] transition-all active:scale-95">
                                        <ShieldCheck size={16} /> Update Password
                                    </button>
                                </div>
                            )}

                            {/* MY ORDERS */}
                            {activeTab === "My Orders" && (
                                <div className="animate-in fade-in duration-300">
                                    <h2 className="text-lg font-black mb-6">My Orders</h2>
                                    {loadingOrders && <p className="text-sm text-gray-400">Loading orders...</p>}
                                    {!loadingOrders && orders?.length === 0 && <p className="text-sm text-gray-400">No orders yet.</p>}
                                    <div className="space-y-4">
                                        {!loadingOrders && orders?.map((order) => (
                                            <div key={order._id} className="bg-[#FAF7F6] p-4 rounded-xl flex justify-between items-center">
                                                <div>
                                                    <p className="font-bold text-xs">Order ID: {order._id}</p>
                                                    <p className="text-[10px] text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                    <p className="text-[10px] font-bold text-[#E24C63] mt-1">Status: {order.status}</p>
                                                    <p className="text-[10px] font-bold text-gray-700 mt-1">Total: Rs {order.total || order.totalAmount}</p>
                                                </div>
                                                <button onClick={() => navigate(`/orders/${order._id}`)} className="text-xs font-bold text-[#E24C63] underline">
                                                    View Details
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowLogoutModal(false)} />
                    <div className="bg-white w-full max-w-[340px] rounded-[28px] p-8 shadow-2xl relative animate-in zoom-in duration-200 text-center">
                        <div className="bg-rose-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-[#E24C63]">
                            <LogOut size={28} />
                        </div>
                        <h3 className="text-lg font-black mb-2">Logout?</h3>
                        <p className="text-gray-400 text-xs font-medium mb-8">Are you sure you want to sign out of your account?</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowLogoutModal(false)} className="flex-1 py-3 rounded-xl font-bold text-xs text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors">Cancel</button>
                            <button onClick={handleLogout} className="flex-1 py-3 rounded-xl font-bold text-xs text-white bg-[#E24C63] shadow-lg shadow-rose-100 hover:bg-[#c93d52] transition-colors">Yes, Logout</button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

const EditableDetail = ({ label, value, isEditing, onChange }) => (
    <div>
        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1">{label}</label>
        {isEditing ? (
            <input value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#FFF1F2]/40 border-2 border-rose-50 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-rose-200 outline-none transition-all" />
        ) : (
            <div className="bg-[#FAF7F6] px-5 py-4 rounded-2xl text-sm font-bold border border-transparent hover:border-rose-50 transition-all">{value || "Not provided"}</div>
        )}
    </div>
);

const PasswordInput = ({ label, value, onChange }) => (
    <div className="mb-5">
        <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1">{label}</label>
        <input type="password" autoComplete="new-password" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-[#FFF1F2]/40 border-2 border-rose-50 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-2 focus:ring-rose-200 outline-none transition-all" />
    </div>
);

export default Profile;