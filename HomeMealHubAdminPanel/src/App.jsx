import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashBoard from './Components/adminDashBoard';
import Sidebar from './Components/sidebar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <div className="flex-1 bg-gray-100">
          <Routes>
            <Route path="/" element={<AdminDashBoard />} />
            {/*more routes*/}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
