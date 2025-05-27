import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setDropdownOpen(false);
    navigate('/admin/login');
  };

  return (
    <div className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] bg-white shadow z-40 px-6 py-4 flex items-center justify-between">
      
      <div className="flex items-center space-x-3">
        <img className="w-8 h-8 object-contain" src="/Homemeal.png" alt="Logo" />
        <h1 className="text-xl font-semibold text-[#F17228]">HomeMealHub</h1>
      </div>

      <div className="text-black flex items-center space-x-6 relative justify-end">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <UserCircle size={28} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
              <ul className="text-sm text-gray-700">
                <li
                  onClick={() => {
                    navigate('/admin/profile');
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
