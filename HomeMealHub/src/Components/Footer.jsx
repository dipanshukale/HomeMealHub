import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react"; 

const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-gray-300 py-12 px-10">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-white">MENU</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="/MenuPage" className="hover:text-[#F17228] transition">View Menu</a></li>
            <li><a href="/offers" className="hover:text-[#F17228] transition">Special Offers</a></li>
            <li><a href="/about" className="hover:text-[#F17228] transition">About Us</a></li>
            <li><a href="/nutrition" className="hover:text-[#F17228] transition">Nutrition Info</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">CUSTOMER SUPPORT</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="/support" className="hover:text-[#F17228] transition">Help & Support</a></li>
            <li><a href="/track-order" className="hover:text-[#F17228] transition">Track My Order</a></li>
            <li><a href="/contact" className="hover:text-[#F17228] transition">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">LEGAL</h3>
          <ul className="mt-4 space-y-2 text-gray-400">
            <li><a href="/terms" className="hover:text-[#F17228] transition">Terms & Conditions</a></li>
            <li><a href="/refund" className="hover:text-[#F17228] transition">Refund & Cancellation</a></li>
            <li><a href="/privacy" className="hover:text-[#F17228] transition">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="flex flex-col space-y-6">
        
          <div>
            <h3 className="text-lg font-semibold text-white">FOLLOW US</h3>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="text-gray-400 hover:text-[#F17228] transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F17228] transition">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#F17228] transition">
                <Twitter size={24} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Exclusive Offers & Discounts</h3>
            <div className="flex mt-3">
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="p-3 w-full rounded-l-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
              />
              <button className="bg-[#F17228] text-white px-6 py-3 rounded-r-lg hover:bg-[#d65e1d] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center border-t border-gray-700 pt-6 text-gray-500">
        <p>All Rights Reserved © HomeMealHub🤍, 2025</p>
      </div>
    </footer>
  );
};

export default Footer; 