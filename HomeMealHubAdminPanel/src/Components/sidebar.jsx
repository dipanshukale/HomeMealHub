import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className={`md:flex flex-col bg-gray-800 text-white w-64 h-screen fixed z-50 top-0 left-0 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:translate-x-0`}>
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:text-yellow-400 cursor-pointer">Dashboard</li>
          <li className="hover:text-yellow-400 cursor-pointer">Customers Orders</li>
          <li className="hover:text-yellow-400 cursor-pointer">Vendor Customers</li>
        </ul>
      </div>

      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar}>
          {isOpen ? <X className="text-white" size={28} /> : <Menu className="text-black" size={28} />}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
