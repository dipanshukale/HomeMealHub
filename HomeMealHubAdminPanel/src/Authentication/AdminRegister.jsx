import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '', // New
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
      const res = await axios.post('http://localhost:8000/api/admin/register', formData);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-100 via-orange-100 to-pink-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-80 backdrop-blur-sm rounded-3xl shadow-lg p-10 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Admin Registration</h1>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-300"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-300"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-300"
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
  );
};

export default AdminRegister;
