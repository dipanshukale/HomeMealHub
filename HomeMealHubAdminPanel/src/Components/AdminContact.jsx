import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminContact = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('https://homemealhub-backend.onrender.com/api/admin/contacts');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching contact messages:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-0 md:ml-64 p-6 pt-24 min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8 text-center sm:text-left drop-shadow">📨 Contact Messages</h1>

      {loading ? (
        <div className="text-center text-gray-500 text-lg animate-pulse">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">No contact messages found.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-semibold">
                  {msg.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">{msg.name}</p>
                  <p className="text-sm text-gray-500">{msg.email}</p>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  {msg.subject}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-3" title={msg.message}>
                {msg.message}
              </p>

              <div className="mt-4 text-right text-xs text-gray-400">
                {new Date(msg.date).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContact;
