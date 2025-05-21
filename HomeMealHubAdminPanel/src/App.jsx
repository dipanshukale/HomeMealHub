import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashBoard from './Components/adminDashBoard';
import Sidebar from './Components/sidebar';
import AdminVendor from './Components/AdminVendor.jsx';
import CustomerOrders from './Components/CustomerOrders.jsx';
import AdminNavbar from './Components/Navbar.jsx';
import AdminMenuAnalytics from './Components/AdminMenu.jsx';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <AdminNavbar/>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<AdminDashBoard />} />
            <Route path ="/admin/customer" element={<CustomerOrders/>}/>
            <Route path="/admin/vendors" element={<AdminVendor/>}/>
            <Route path="/admin/menu" element={<AdminMenuAnalytics/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )

}

export default App;
