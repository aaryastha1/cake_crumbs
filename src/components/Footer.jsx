// Footer.js
import React from "react";
// Assuming you have configured 'font-serif-tnr' in your tailwind.config.js

const Footer = () => {
  return (
    // Set the overall font and background
    <footer className="w-full bg-white p-6 mt-10 border-t border-gray-100 font-serif-tnr">
      
      {/* Container for content, centered and max-width for less "wide" feel */}
      <div className="flex justify-between items-start max-w-6xl mx-auto py-4">
        
        {/* --- Visit Us Section (Left Side) --- */}
        <div className="text-gray-700">
          <h3 className="text-xl font-bold mb-2">Visit Us</h3>
          
          {/* Location */}
          <div className="flex items-center text-sm mb-1">
            <span className="mr-2 text-pink-600">📍</span>
            <p className="m-0">Koteshwor, Kathmandu</p>
          </div>
          
          {/* Contact Number */}
          <div className="flex items-center text-sm">
            <span className="mr-2 text-pink-600">📞</span>
            <p className="m-0">505-418-0415</p>
          </div>
        </div>
        
        {/* --- Follow Us Section (Right Side) --- */}
        <div className="flex flex-col items-end text-sm">
          <p className="mb-2 text-gray-700">Follow Us</p>
          
          {/* Social Media Icons */}
          <div className="flex gap-3">
            {/* Facebook Icon */}
            <a 
              href="#facebook" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              {/* Using a placeholder image for the Facebook icon as shown in the UI */}
              <img 
                src="https://img.icons8.com/ios-filled/24/100052/facebook-new.png" 
                alt="Facebook" 
                className="w-6 h-6"
              />
            </a>
            
            {/* Instagram Icon */}
            <a 
              href="#instagram" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition"
            >
              {/* Using a placeholder image for the Instagram icon as shown in the UI */}
              <img 
                src="https://img.icons8.com/ios-filled/24/100052/instagram-new.png" 
                alt="Instagram" 
                className="w-6 h-6"
              />
            </a>
          </div>
        </div>
      </div>

      {/* Optional: Add Copyright below the main content if needed for completeness */}
      {/* <div className="text-center text-gray-500 text-xs mt-4 border-t pt-2 border-gray-100 max-w-6xl mx-auto">
        &copy; {new Date().getFullYear()} Cakes & Crumbs. All rights reserved.
      </div> */}
      
    </footer>
  );
};

export default Footer;