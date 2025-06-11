import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import dietImg from '/diet3.jpg';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('https://homemealhub-backend.onrender.com/api/admin/login', {
        email,
        password,
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${dietImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-full max-w-md bg-white bg-opacity-95 rounded-xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>

        {error && (
          <p className="bg-red-100 text-red-700 py-2 px-4 rounded mb-4 text-sm text-center">
            {error}
          </p>
        )}

        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded"
        />

        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <div className="relative mb-6">
          <input
            type={visible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            className="w-full p-3 border border-gray-300 rounded pr-10"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {visible ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#f79e89] text-white font-semibold py-2 rounded hover:bg-[#f2846b] transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/admin/register')}
            className="text-[#f2846b] hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
