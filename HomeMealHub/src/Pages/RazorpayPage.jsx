import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RazorpayPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer, total, cart } = location.state || {};

  useEffect(() => {
    if (!customer || !total || !cart) {
      alert("Missing order details");
      navigate("/");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
    };
      script.onload = () => {
          handleRazorpayPayment();
    };
    document.body.appendChild(script);
  }, []);



  //we have to create order id from backend for that we have to use api

  const handleRazorpayPayment = (orderId) => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not available.");
      return;
    }


  const options = {
      key: "rzp_test_rYotw26yI2s6Zu", // Replace with your actual key
      amount: total * 100,
      currency: "INR",
      name: customer.name,
      description: "Meal Subscription Payment",
    order_id: orderId,
    handler: function (response) {
     
      navigate("/thankyou", {
        state: { customer, total, paymentId: response.razorpay_payment_id }
      });
      },
    modal: {
      ondismiss: function () {
        navigate("/payment-failed", {
          state: { customer, total },
        });
      },
    },

};
      

 const rzp = new window.Razorpay(options);
 rzp.open();
};
  
  if (!customer || !total || !cart) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <div className="p-6 sm:p-10 mt-20 max-w-xl mx-auto bg-white  rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-[#F17228]">Processing Payment...</h2>
      <div className="text-gray-700 space-y-2 text-center shadow-xs shadow-black">
        <p><strong>Name:</strong> {customer.name}</p>
        <p><strong>Phone:</strong> {customer.phone}</p>
        <p><strong>Total Amount:</strong> ₹{total.toFixed(2)}</p>
      </div>
      <p className="mt-6 text-sm text-center text-gray-500">The Razorpay payment window will open shortly...</p>
    </div>
  );
};

export default RazorpayPage;
