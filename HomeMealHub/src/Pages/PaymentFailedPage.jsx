import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const PaymentFailedPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer, total } = location.state || {};

  return (
    <div className="p-6 sm:p-10 mt-20 max-w-xl mx-auto bg-white shadow-md rounded-xl text-center">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Failed or Cancelled</h2>
      {customer && (
        <>
          <p className="text-gray-700"><strong>Name:</strong> {customer.name}</p>
          <p className="text-gray-700"><strong>Total Attempted:</strong> ₹{total.toFixed(2)}</p>
        </>
      )}
      <p className="mt-4 text-gray-500">You exited the payment process or it failed.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-[#F17228] hover:bg-[#d95b14] text-white font-semibold py-2 px-4 rounded"
      >
        Continue from Home
      </button>
    </div>
  );
};

export default PaymentFailedPage;
