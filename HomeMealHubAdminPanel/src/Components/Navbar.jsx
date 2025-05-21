import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const res = await axios.get(`http://localhost:8000/api/admin/search?q=${searchQuery}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleLogout = () => {
    // Optional: clear auth token or session
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] bg-white shadow z-40 px-6 py-4 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <img className="w-8 h-8 object-contain" src="/Homemeal.png" alt="Logo" />
        <h1 className="text-xl font-semibold text-[#F17228]">HomeMealHub</h1>
      </div>

      {/* Search Bar and Profile */}
      <div className="text-black flex items-center space-x-6 relative w-full max-w-md justify-end">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="w-full max-w-xs relative">
          <input 
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          />
          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-md z-50 max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <div key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                  {result.name || result.subject || 'Unnamed Record'}
                </div>
              ))}
            </div>
          )}
        </form>

        {/* Profile Dropdown */}
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
                  onClick={() => {
                    navigate('/admin/settings');
                    setDropdownOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Settings
                </li>
                <li
                  onClick={() => {
                    navigate('/admin/settings');
                    setDropdownOpen(false);
                  }}
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
