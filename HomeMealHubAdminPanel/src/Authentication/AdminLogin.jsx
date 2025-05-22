import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      const res = await axios.post('http://localhost:8000/api/admin/login', {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl mb-6 text-center font-semibold text-gray-800">Admin Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
        <div className="relative mb-6">
          <input
            type={visible ? 'text' : 'password'}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded pr-10"
          />
          <button
            type="button"
            className="absolute right-2 top-2 text-gray-500 text-sm"
            onClick={() => setVisible(!visible)}
            aria-label="Toggle password visibility"
          >
            {visible ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white font-medium py-2 rounded hover:bg-orange-600 transition duration-200"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/admin/register')}
            className="text-orange-500 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default AdminLogin;
