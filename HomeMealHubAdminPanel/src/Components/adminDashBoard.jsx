import { useEffect, useState } from 'react';
import axios from 'axios';
import { Users, Truck, ShoppingCart, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
  
    axios.get('http://localhost:8000/api/vendor/data')
      .then(res => setVendorCount(res.data.length))
      .catch(err => console.error('Error fetching vendors:', err));

    axios.get('http://localhost:8000/api/orders')
      .then(res => {
        setOrderCount(res.data.length);
        setCustomerCount(res.data.length);
        setRecentOrders(res.data.slice(-5).reverse()); // Get latest 5
        const total = res.data.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        setRevenue(total);
      })
      .catch(err => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div className="ml-0 md:ml-64 p-6 pt-24 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <Users size={40} className="text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold">Customers</h2>
            <p className="text-3xl font-bold text-blue-600">{customerCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <Truck size={40} className="text-green-600" />
          <div>
            <h2 className="text-xl font-semibold">Vendors</h2>
            <p className="text-3xl font-bold text-green-600">{vendorCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <ShoppingCart size={40} className="text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-3xl font-bold text-purple-600">{orderCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-4">
          <DollarSign size={40} className="text-yellow-500" />
          <div>
            <h2 className="text-xl font-semibold">Total Revenue</h2>
            <p className="text-3xl font-bold text-yellow-500">₹{revenue}</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Order ID</th>
                <th className="px-4 py-2 text-left font-semibold">Customer</th>
                <th className="px-4 py-2 text-left font-semibold">Total (₹)</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.name || 'N/A'}</td>
                  <td className="px-4 py-2">₹{order.totalAmount || 0}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                      order.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {order.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentOrders.length === 0 && (
            <p className="text-gray-500 py-4">No recent orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
