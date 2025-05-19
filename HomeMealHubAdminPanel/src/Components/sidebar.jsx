import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div
        className={`md:flex flex-col bg-gray-800 text-white w-64 h-screen fixed z-50 top-0 left-0 p-10 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 md:translate-x-0`}
      >
        <h2 className="text-2xl font-stretch-50% mb-16">Admin Panel</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-400 cursor-pointer"
              onClick={toggleSidebar}
            >
              Customers Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/vendors"
              className="hover:text-yellow-400 cursor-pointer"
              onClick={toggleSidebar}
            >
              Vendor Customers
            </Link>
          </li>
        </ul>
      </div>

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
