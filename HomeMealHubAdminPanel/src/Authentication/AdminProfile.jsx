import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  const fetchAdminProfile = async () => {
    setLoading(true);
    setError('');
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    try {
      const res = await axios.get('http://localhost:8000/api/admin/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmin(res.data.admin);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError('Failed to load profile. Please try again.');
      if (error.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-700 text-lg flex items-center gap-2">
          Loading profile...
          <svg
            className="animate-spin h-5 w-5 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={fetchAdminProfile}
          className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded-full font-semibold shadow-lg transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500 text-lg">Failed to load profile.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center ml-70 bg-white px-4 py-10">
      <div className="bg-gradient-to-br from-orange-50 via-pink-50 to-yellow-50 border border-orange-100 rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <div className="w-24 h-24 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-6 shadow-lg">
          {admin.name?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">Admin Profile</h1>

        <ProfileItem icon={<FaUser className="text-orange-500" />} label="Name" value={admin.name} />
        <ProfileItem icon={<FaEnvelope className="text-orange-500" />} label="Email" value={admin.email} />
        <ProfileItem icon={<FaPhone className="text-orange-500" />} label="Phone" value={admin.phone || 'Not Provided'} />

        <button
          onClick={handleLogout}
          className="mt-8 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-full font-semibold shadow-md hover:scale-105 transition-transform duration-200"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="text-2xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="text-gray-800 font-semibold">{value}</p>
    </div>
  </div>
);

export default AdminProfile;
