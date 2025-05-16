import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashBoard from './Components/adminDashBoard';
import AdminVendor from './Components/AdminVendor';
import Sidebar from './Components/sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 bg-gray-100 p-6">
          <Routes>
            <Route path="/" element={<AdminDashBoard />} />
            <Route path="/admin/vendors" element={<AdminVendor />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
