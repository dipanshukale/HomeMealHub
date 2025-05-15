import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { customer, total, paymentId } = location.state || {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3F4F6]">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful 🎉</h1>
        <p className="text-gray-700 mb-2">Thank you for your order, <strong>{customer?.name}</strong>!</p>
        <p className="text-gray-700 mb-2">We’ve received your payment of <strong>₹{total?.toFixed(2)}</strong>.</p>
        {paymentId && (
          <p className="text-sm text-gray-500 mt-2">
            Payment ID: <span className="font-mono">{paymentId}</span>
          </p>
        )}
        <button
          onClick={() => navigate("/")}
          className="mt-6 px-4 py-2 bg-[#F17228] hover:bg-[#d75c1a] text-white rounded-md transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
