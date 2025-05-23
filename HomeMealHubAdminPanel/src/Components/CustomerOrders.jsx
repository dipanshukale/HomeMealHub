import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Package,
   ShoppingCart,
  ListTodo,
} from "lucide-react";

const statusColors = {
  "Ready To Pick": "bg-yellow-100 text-yellow-700",
  "Out Of Delivery": "bg-blue-100 text-blue-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Confirmed: "bg-purple-100 text-purple-700",
  Preparing: "bg-orange-100 text-orange-700",
  Pending: "bg-gray-100 text-gray-700",
};

const OrderCard = ({ title, count, icon, color }) => (
  <div className="bg-white p-5 shadow-md rounded-xl flex items-center space-x-5 transition duration-300 transform hover:shadow-xl hover:-translate-y-1">
    <div className={`p-4 rounded-full ${color} text-white flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <h4 className="text-2xl font-bold text-gray-900">{count}</h4>
      <p className="text-sm font-medium text-gray-500">{title}</p>
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
        setOrders(res.data);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    axios
      .put(`http://localhost:8000/api/orders/${orderId}/status`, { status: newStatus })
      .then(() => {
        fetchOrders();
      })
      .catch(() => alert("Failed to update order status"));
  };

  const getStatusCount = (status) =>
    orders.filter((order) => order.status === status).length;

  return (
    <div className="ml-0 md:ml-64 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8 transition-all duration-300">
     
       <h1 className="text-4xl font-extrabold text-orange-600 mb-10  mt-19 flex items-center justify-center sm:justify-start gap-3 drop-shadow-lg">
        <ShoppingCart size={48} className="text-orange-500" />
        Customer Orders
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 mb-9 mt-2">
        <OrderCard
          title="Total Orders"
          count={orders.length}
          icon={<Package size={28} />}
          color="bg-indigo-600"
        />
        <OrderCard
          title="Delivered"
          count={getStatusCount("Delivered")}
          icon={<CheckCircle size={28} />}
          color="bg-green-600"
        />
        <OrderCard
          title="Pending"
          count={getStatusCount("Pending")}
          icon={<Clock size={28} />}
          color="bg-yellow-500"
        />
        <OrderCard
          title="Cancelled"
          count={getStatusCount("Cancelled")}
          icon={<XCircle size={28} />}
          color="bg-red-600"
        />
        <OrderCard
          title="Preparing"
          count={getStatusCount("Preparing")}
          icon={<ListTodo size={28} />}
          color="bg-orange-500"
        />
      </div>

      {/* Orders List */}
      <div className="space-y-8">
        {orders.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-20">No orders found.</p>
        ) : (
          orders.map((order, idx) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="flex items-center space-x-3 mb-3 md:mb-0">
                  <span className="text-indigo-600 font-semibold text-lg">{`#ORD-${idx + 1}`}</span>
                  <h3 className="font-bold text-gray-900 text-xl">{order.name}</h3>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Phone:</span> {order.phone}
                  </div>
                  <div>
                    <span className="font-semibold">Date:</span> {formatDate(order.createdAt)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                <div>
                  <h4 className="font-semibold mb-2 text-indigo-700">Items</h4>
                  <ul className="list-disc list-inside max-h-28 overflow-y-auto text-gray-700 bg-gray-50 p-3 rounded-md border border-gray-300">
                    {Array.isArray(order.cartItems) ? (
                      order.cartItems.map((item, i) => (
                        <li key={i}>{item.title} x {item.quantity}</li>
                      ))
                    ) : (
                      <li>N/A</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-indigo-700">Pricing</h4>
                  <ul className="text-gray-700 space-y-1">
                    <li><span className="font-semibold">Price(s):</span> {Array.isArray(order.cartItems) ? order.cartItems.map(item => `₹${item.price}`).join(", ") : "N/A"}</li>
                    <li><span className="font-semibold">Shipping:</span> ₹{order.shipping}</li>
                    <li><span className="font-semibold">GST:</span> ₹{order.gst}</li>
                    <li><span className="font-semibold">Total:</span> ₹{order.totalAmount}</li>
                    <li className="font-bold text-green-700">Grand Total: ₹{order.grandTotal}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-indigo-700">Address</h4>
                  <p className="text-gray-700 break-words max-h-28 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
                    {order.address}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                    statusColors[order.status] || "bg-gray-300 text-gray-800"
                  }`}
                >
                  {order.status || "Pending"}
                </span>

                <div className="flex flex-wrap gap-3">
                  <button
                    className="bg-orange-500 text-white text-xs px-3 py-1 rounded-lg hover:bg-orange-600 transition"
                    onClick={() => updateOrderStatus(order._id, "Preparing")}
                  >
                    Preparing
                  </button>
                  <button
                    className="bg-green-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-green-700 transition"
                    onClick={() => updateOrderStatus(order._id, "Delivered")}
                  >
                    Delivered
                  </button>
                  <button
                    className="bg-red-600 text-white text-xs px-3 py-1 rounded-lg hover:bg-red-700 transition"
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CustomerOrders;
