import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/orders')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Error fetching orders:', err));
  }, []);

  return (
    <div className="p-4 mt-16 md:ml-64">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Orders</h1>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer Name</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Address</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Shipping</th>
              <th className="px-4 py-3 text-left">GST</th>
              <th className="px-4 py-3 text-left">Grand Total</th>
              <th className="px-4 py-3 text-left">Created At</th>
              <th className="px-4 py-3 text-left">Cart Items</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-sm">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 break-all">{order._id}</td>
                <td className="px-4 py-3">{order.name}</td>
                <td className="px-4 py-3">{order.phone}</td>
                <td className="px-4 py-3 max-w-xs break-words">{order.address}</td>
                <td className="px-4 py-3 whitespace-nowrap">₹{order.totalAmount}</td>
                <td className="px-4 py-3 whitespace-nowrap">₹{order.shipping}</td>
                <td className="px-4 py-3 whitespace-nowrap">₹{order.gst}</td>
                <td className="px-4 py-3 whitespace-nowrap font-semibold text-green-700">
                  ₹{order.grandTotal}
                </td>
                <td className="px-4 py-3">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {order.cartItems && order.cartItems.length > 0 ? (
                    <div className="max-h-40 overflow-y-auto border rounded bg-gray-50 p-2">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-gray-600">
                            <th className="text-left p-1">Title</th>
                            <th className="text-left p-1">Qty</th>
                            <th className="text-left p-1">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.cartItems.map((item, idx) => (
                            <tr key={idx}>
                              <td className="p-1">{item.title}</td>
                              <td className="p-1">{item.quantity}</td>
                              <td className="p-1">₹{item.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <span className="text-gray-500">No items</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center text-gray-500 py-6">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
