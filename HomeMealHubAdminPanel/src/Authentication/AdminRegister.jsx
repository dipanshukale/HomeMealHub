import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import dietImg from '/diet1.jpg'; 

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', 
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://homemealhub-backend.onrender.com/api/admin/register', formData);
      if (res.data.success) {
        navigate('/admin/login');
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${dietImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
     
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Admin Registration</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full mb-4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-6 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-pink-500 text-white py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
