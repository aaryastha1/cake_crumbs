import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {/* Main content: flex center */}
      <main className="flex-1 w-full flex justify-center items-center bg-gray-50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
