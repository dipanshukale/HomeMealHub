import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminDashBoard from './Components/adminDashBoard';
import Sidebar from './Components/sidebar';
import AdminVendor from './Components/AdminVendor.jsx';
import CustomerOrders from './Components/CustomerOrders.jsx';
import AdminNavbar from './Components/Navbar.jsx';
import AdminContact from './Components/AdminContact';
import AdminRegister from './Authentication/AdminRegister.jsx';
import AdminLogin from './Authentication/AdminLogin';
import AdminProfile from './Authentication/AdminProfile';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('adminToken');
    return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
  };

  const isAuthenticated = localStorage.getItem('adminToken');

  return (
    <Router>
      {isAuthenticated && <AdminNavbar />}
      <div className="flex min-h-screen">
        {isAuthenticated && <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />}
        <div className="flex-1 bg-gray-100">
          <Routes>
           
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <PrivateRoute>
                  <AdminDashBoard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/profile"
              element={
                <PrivateRoute>
                  <AdminProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/customer"
              element={
                <PrivateRoute>
                  <CustomerOrders />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/vendors"
              element={
                <PrivateRoute>
                  <AdminVendor />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/contacts"
              element={
                <PrivateRoute>
                  <AdminContact />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
