import { Menu, X, LayoutDashboard, Users, PackageCheck, PieChart, ShoppingCart } from 'lucide-react';

import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:flex md:flex-col p-6`}
      >
        {/* Sidebar Header */}
        <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-6 text-base">
            <li className="flex items-center space-x-3">
              <LayoutDashboard className="w-5 h-5 text-yellow-400" />
              <Link
                to="/"
                className="hover:text-yellow-400"
                onClick={toggleSidebar}
              >
                Dashboard
              </Link>
            </li>
            <li className="flex items-center space-x-3">
              <ShoppingCart className="w-5 h-5 text-yellow-400" />
              <Link
                to="/admin/customer"
                className="hover:text-yellow-400"
                onClick={toggleSidebar}
              >
                Orders
              </Link>
            </li>
            <li className="flex items-center space-x-3">
              <PackageCheck className="w-5 h-5 text-yellow-400" />
              <Link
                to="/admin/vendors"
                className="hover:text-yellow-400"
                onClick={toggleSidebar}
              >
                Vendor
              </Link>
            </li>
            
             <li className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-yellow-400" />
              <Link
                to="/admin/contacts"
                className="hover:text-yellow-400"
                onClick={toggleSidebar}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Toggle Button for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={toggleSidebar}>
          {isOpen ? (
            <X className="text-white" size={28} />
          ) : (
            <Menu className="text-black" size={28} />
          )}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
