// import React from "react";
// import { Routes, Route } from "react-router-dom";

// // Auth pages
// import Register from "../pages/Register";
// import Login from "../pages/Login";
// import Home from "../pages/Home";

// // Admin pages
// import CakePreviewPage from "../pages/admin/cakepreview";
// import AdminDashboard from "../pages/admin/adminDashboard";
// import AdminCustomizes from "../pages/admin/adminCustomize";
// import AdminCategories from "../pages/admin/adminCategories";
// import CreateCategory from "../pages/admin/addCategory";
// import AdminProducts from "../pages/admin/adminProduct";
// import AddProduct from "../pages/admin/addproduct";
// import ViewProduct from "../pages/admin/adminviewproduct";
// import EditProduct from "../pages/admin/admineditProduct";

// // Frontend (user) pages
// import OccasionProducts from "../pages/OccasionProducts";
// import CakeDetails from "../pages/CakeDetails"; // ✅ new
// import AboutUs from "../pages/aboutUs"; 

// // Admin layout
// import AdminLayout from "../layouts/adminLayout";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* Auth */}
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />

//       {/* Admin Routes (WITH SIDEBAR) */}
//       <Route path="/admin" element={<AdminLayout />}>
//         <Route path="dashboard" element={<AdminDashboard />} />
//         <Route path="preview-cake" element={<CakePreviewPage />} />
//         <Route path="customizes" element={<AdminCustomizes />} />
//         <Route path="categories" element={<AdminCategories />} />
//         <Route path="categories/add" element={<CreateCategory />} />
//         <Route path="products" element={<AdminProducts />} />
//         <Route path="products/add" element={<AddProduct />} />
//         <Route path="products/view/:id" element={<ViewProduct />} />
//         <Route path="products/edit/:id" element={<EditProduct />} />
//       </Route>

//       {/* User Frontend Routes */}
//       <Route path="/occasions/:occasionId" element={<OccasionProducts />} />
//       <Route path="/products/:productId" element={<CakeDetails />} /> {/* ✅ new */}


//         <Route path="/about-us" element={<AboutUs />} />

//       {/* Home / fallback */}
//       <Route path="*" element={<Home />} />
//     </Routes>
//   );
// }




import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth pages
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";

// Admin pages
import CakePreviewPage from "../pages/admin/cakepreview";
import AdminDashboard from "../pages/admin/adminDashboard";
import AdminCustomizes from "../pages/admin/adminCustomize";
import AdminCategories from "../pages/admin/adminCategories";
import CreateCategory from "../pages/admin/addCategory";
import AdminProducts from "../pages/admin/adminProduct";
import AddProduct from "../pages/admin/addproduct";
import ViewProduct from "../pages/admin/adminviewproduct";
import EditProduct from "../pages/admin/admineditProduct";
import AdminOrders from "../pages/admin/adminOrder"; // ✅ new Admin page
import AdminBakery from "../pages/admin/adminBakery";

// Frontend (user) pages
import OccasionProducts from "../pages/OccasionProducts";
import CakeDetails from "../pages/CakeDetails";
import AboutUs from "../pages/aboutUs";
import UserCustomizes from "../pages/Customizecake";
import BakeryProducts from "../pages/bakeries";
import Profile from "../pages/profile";
import FavoritesPage from "../pages/favoritepage";
import CakePreview from "../pages/cakepreview";
import Checkout from "../pages/checkout";
import ProductDetailsPage from "../pages/productDetailPage";
import PaymentSuccess from "../pages/paymentsuccess";
import PaymentFailed from "../pages/paymentfailure";

// ✅ new user page

// Admin layout
import AdminLayout from "../layouts/adminLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes (WITH SIDEBAR) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="preview-cake" element={<CakePreviewPage />} />
        <Route path="customizes" element={<AdminCustomizes />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="categories/add" element={<CreateCategory />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/view/:id" element={<ViewProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="orders" element={<AdminOrders />} /> {/* ✅ Admin Orders page */}
        <Route path="bakery" element={<AdminBakery />} />

      </Route>

      {/* User Frontend Routes */}
      <Route path="/occasions/:occasionId" element={<OccasionProducts />} />
      <Route path="/products/:productId" element={<CakeDetails />} />
      <Route path="/customize" element={<AdminCustomizes />} /> {/* ✅ User Customize Cake page */}
      <Route path="/about-us" element={<AboutUs />} />


      <Route path="/customize-cake" element={<UserCustomizes />} />

      <Route path="/bakeries" element={<BakeryProducts />} />             {/* All bakeries */}
      <Route path="/bakeries/:categoryId" element={<BakeryProducts />} /> {/* Filtered by category */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cake-preview" element={<CakePreview />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      <Route path="/payment-failed" element={<PaymentFailed />} />

      <Route path="/checkout" element={<Checkout />} />

      <Route path="/preview/:id" element={<CakePreview />} />
      <Route path="/product/:productId" element={<ProductDetailsPage />} />









      {/* Home / fallback */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
