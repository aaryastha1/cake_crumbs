import React from "react";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-pink-50 text-pink-900 font-sans border-t border-pink-100">


      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">


          <div className="space-y-3 md:pl-17">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Cake and Crumbs
            </h3>
            <p className="text-xs leading-relaxed text-pink-800/70">
              Crafting sweet memories since 2025. Every bite tells a story of passion, quality, and love.
            </p>
          </div>

          <div className="space-y-3 md:pl-24">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-xs text-pink-800/80">
              <li><Link to="/" className="hover:text-pink-600 transition">Home</Link></li>

              <li><Link to="/about-us" className="hover:text-pink-600 transition">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-pink-600 transition">Privacy Policy</Link></li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=yYT8oQNea44"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-600 transition"
                >
                  Cake & Crumbs Demo
                </a>
              </li>

            </ul>
          </div>

          <div className="space-y-3 md:pl-23">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Visit Us
            </h3>
            <div className="space-y-2 text-xs text-pink-800/80">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-pink-600" />
                <span>Koteshwor, Kathmandu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-pink-600" />
                <span>+9779806789090</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-pink-600" />
                <a
                  href="mailto:cakeandcrumbs@gmail.com"
                  className="text-pink-800/80 hover:text-pink-600 transition"
                >
                  cakeandcrumbs@gmail.com
                </a>
              </div>

            </div>
          </div>


          <div className="space-y-3 ">
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com" // replace with your Facebook URL
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-pink-600 shadow-sm hover:bg-pink-600 hover:text-white transition"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com" // replace with your Instagram URL
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-pink-600 shadow-sm hover:bg-pink-600 hover:text-white transition"
              >
                <Instagram size={16} />
              </a>
            </div>

          </div>

        </div>
      </div>


      <div className="border-t border-pink-200 py-4 text-center text-[10px] text-pink-400 tracking-widest uppercase">
        © 2026 All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;