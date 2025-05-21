import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Package,
  Phone,
  MapPin,
  ListTodo,
} from "lucide-react";

const statusColors = {
  "Ready To Pick": "bg-yellow-100 text-yellow-700",
  "Out Of Delivery": "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Confirmed: "bg-purple-100 text-purple-700",
  Preparing: "bg-orange-100 text-orange-700",
};

const OrderCard = ({ title, count, icon, color }) => (
  <div className="bg-white p-5 shadow rounded-lg flex items-center space-x-4">
    <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>
    <div>
      <h4 className="text-xl font-semibold">{count}</h4>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  </div>
);

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend
  const fetchOrders = () => {
    axios
      .get("http://localhost:8000/api/orders")
      .then((res) => {
        console.log("Fetched orders:", res.data);
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status handler
  const updateOrderStatus = (orderId, newStatus) => {
    axios
      .put(`http://localhost:8000/api/orders/${orderId}/status`, { status: newStatus })
      .then((res) => {
        console.log("Status updated:", res.data);
        fetchOrders();
      })
      .catch((err) => {
        console.error("Failed to update status:", err);
        alert("Failed to update order status");
      });
  };

  const getStatusCount = (status) =>
    orders.filter((order) => order.status === status).length;

  return (
    <div className="ml-0 md:ml-64 min-h-screen bg-gray-100 p-6 transition-all duration-300">
      {/* Top Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-8 mt-20">
        <OrderCard
          title="Total Orders"
          count={orders.length}
          icon={<Package size={24} />}
          color="bg-indigo-500"
        />
        <OrderCard
          title="Delivered"
          count={getStatusCount("Delivered")}
          icon={<CheckCircle size={24} />}
          color="bg-green-500"
        />
        <OrderCard
          title="Pending"
          count={getStatusCount("Pending")}
          icon={<Clock size={24} />}
          color="bg-orange-500"
        />
        <OrderCard
          title="Cancelled"
          count={getStatusCount("Cancelled")}
          icon={<XCircle size={24} />}
          color="bg-red-500"
        />
        <OrderCard
          title="Preparing"
          count={getStatusCount("Preparing")}
          icon={<ListTodo size={24} />}
          color="bg-red-500"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-200 text-gray-700 text-left">
            <tr>
              <th className="p-4">Order No.</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Items</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Price</th>
              <th className="p-4">Shipping</th>
              <th className="p-4">GST</th>
              <th className="p-4">Total</th>
              <th className="p-4">Grand Total</th>
              <th className="p-4">Date</th>
              <th className="p-4">Address</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order._id}
                className="border-b border-gray-200 hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">{`#ORD-${idx + 1}`}</td>
                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.phone}</td>

                {/* Items Name */}
                <td className="p-4">
                  {Array.isArray(order.cartItems) ? (
                    <div className="bg-gray-100 p-3 rounded-md cursor-pointer space-y-1 shadow-sm border border-gray-200">
                      {order.cartItems.map((item, index) => (
                        <div key={index} className="text-sm text-gray-700">
                          • {item.title}
                        </div>
                      ))}
                    </div>
                  ) : (
                    "N/A"
                  )}
                </td>

                {/* Quantities */}
                <td className="p-4">
                  {Array.isArray(order.cartItems)
                    ? order.cartItems.reduce(
                        (total, item) => total + item.quantity,
                        0
                      )
                    : "N/A"}
                </td>

                {/* Prices */}
                <td className="p-4">
                  {Array.isArray(order.cartItems)
                    ? order.cartItems.map((item) => `₹${item.price}`).join(", ")
                    : "N/A"}
                </td>

                {/* Shipping, GST, Total, Grand */}
                <td className="p-4">₹{order.shipping}</td>
                <td className="p-4">₹{order.gst}</td>
                <td className="p-4 font-semibold">₹{order.totalAmount}</td>
                <td className="p-4 font-bold text-green-700">
                  ₹{order.grandTotal}
                </td>

                {/* Date */}
                <td className="p-4">{formatDate(order.createdAt)}</td>

                {/* Address */}
                <td className="p-4">{order.address}</td>

                {/* Status */}
                <td className="p-4 space-y-2">
                  {/* Status Badge */}
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      statusColors[order.status] || "bg-gray-300 text-gray-800"
                    }`}
                  >
                    {order.status || "Pending"}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <button
                      className="bg-orange-500 text-white text-xs cursor-pointer px-2 py-1 rounded hover:bg-orange-600"
                      onClick={() => updateOrderStatus(order._id, "Preparing")}
                    >
                      Preparing
                    </button>
                    <button
                      className="bg-green-600 text-white text-xs px-2 py-1 cursor-pointer rounded hover:bg-green-700"
                      onClick={() => updateOrderStatus(order._id, "Delivered")}
                    >
                      Delivered
                    </button>
                    <button
                      className="bg-red-500 text-white text-xs px-2 py-1 cursor-pointer rounded hover:bg-red-600"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to cancel this order? This will delete the order."
                          )
                        ) {
                          updateOrderStatus(order._id, "Cancelled");
                        }
                      }}
                    >
                      Cancelled
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerOrders;
