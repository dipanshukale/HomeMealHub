import { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Truck,
  ShoppingCart,
  DollarSign,
  Clock,
} from "lucide-react";

const statusColors = {
  Delivered: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-700",
  Preparing: "bg-orange-100 text-orange-700",
  Confirmed: "bg-blue-100 text-blue-700",
};

const AdminDashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    axios
      .get("https://homemealhub-backend.onrender.com/api/vendor/data")
      .then((res) => setVendorCount(res.data.length))
      .catch((err) => console.error("Error fetching vendors:", err));

    axios
      .get("https://homemealhub-backend.onrender.com/api/admin/contacts")
      .then((res) => {
        setOrderCount(res.data.length);
        setCustomerCount(res.data.length);
        setRecentOrders(res.data.slice(-5).reverse());
        const total = res.data.reduce(
          (sum, order) => sum + (orders.totalAmount || 0),
          0
        );
        setRevenue(total);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="ml-0 md:ml-64 p-6 pt-28 min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <h1 className="text-4xl font-extrabold text-orange-600 mb-8 text-center sm:text-left drop-shadow">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[
          {
            title: "Customers",
            count: customerCount,
            icon: <Users size={40} className="text-white" />,
            bg: "bg-blue-500",
          },
          {
            title: "Vendors",
            count: vendorCount,
            icon: <Truck size={40} className="text-white" />,
            bg: "bg-green-500",
          },
          {
            title: "Orders",
            count: orderCount,
            icon: <ShoppingCart size={40} className="text-white" />,
            bg: "bg-purple-500",
          },
          {
            title: "Total Revenue",
            count: `₹${revenue.toLocaleString()}`,
            icon: <DollarSign size={40} className="text-white" />,
            bg: "bg-yellow-500",
          },
        ].map(({ title, count, icon, bg }) => (
          <div
            key={title}
            className={`rounded-xl shadow-lg p-6 flex items-center space-x-5 text-white transform transition hover:scale-105 ${bg}`}
          >
            <div className="p-4 bg-white/20 rounded-full">{icon}</div>
            <div>
              <h2 className="text-lg font-semibold tracking-wide">{title}</h2>
              <p className="text-3xl font-extrabold mt-1">{count}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6 space-x-3">
          <Clock size={28} className="text-indigo-600" />
          <h2 className="text-2xl font-bold text-indigo-900">Recent Orders</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-indigo-100 text-indigo-800 uppercase font-semibold tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">Order ID</th>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Total (₹)</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 text-center text-gray-400 italic"
                  >
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-indigo-50 cursor-pointer transition"
                    title={`Order ${order._id}`}
                  >
                    <td className="px-6 py-3 font-mono truncate max-w-[120px]">
                      {order._id}
                    </td>
                    <td className="px-6 py-3">{order.name || "N/A"}</td>
                    <td className="px-6 py-3 font-semibold text-indigo-700">
                      ₹{order.totalAmount || "0"}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          statusColors[order.status] ||
                          "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
