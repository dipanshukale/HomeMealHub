import React, { useState, useEffect } from "react";
import { useCart } from "../AuthContext/CartContext";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";

const CheckOutPage = () => {
  const { totalAmount, cartItems } = useCart();
  const [userData, setUserData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [qrGenerated, setQrGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shipping = totalAmount > 0 ? 40 : 0;
  const gst = totalAmount * 0.05;
  const grandTotal = totalAmount + shipping + gst;

  const upiBankName = "Bank of Baroda";
  const upiId = "dipanshukale73@oksbi";
  const qrPayload = `upi://pay?pa=${upiId}&pn=${upiBankName}&am=${grandTotal.toFixed(
    2
  )}&cu=INR`;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.name.trim()) newErrors.name = "Name is required";
    if (!userData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(userData.phone))
      newErrors.phone = "Invalid phone";
    if (!userData.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProceed = async () => {
    if (!validateForm()) return;

    setLoading(true); // Start loader
    try {
      await axios.post(
        "/api/orders/checkoutOrder",
        {
          ...userData,
          cartItems,
          totalAmount,
          shipping,
          gst,
          grandTotal,
        }
      );

      navigate("/razorpay", {
        state: {
          customer: userData,
          total: grandTotal,
          cart: cartItems,
        },
      });
    } catch (error) {
      alert("Your Cart Is Empty, please select your delicious food first!");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  const handleConfirmOrder = () => {
    alert("Order confirmed!");
    navigate("/thankyou");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xs shadow-black rounded-xl p-6 sm:p-10 mt-6">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-[#F17228]">
          Checkout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Customer Details
            </h3>
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={userData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={userData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <textarea
                  name="address"
                  placeholder="Delivery Address"
                  value={userData.address}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>
              <button
                onClick={handleProceed}
                className="w-full bg-gradient-to-r cursor-pointer from-[#F17228] to-[#f38b34] text-white py-2 rounded-lg font-semibold hover:scale-105 transition flex justify-center items-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl border">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{gst.toFixed(2)}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-gray-800">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {qrGenerated && (
              <div className="mt-6 text-center">
                <p className="text-gray-700 font-medium mb-2">
                  Scan & Pay via{" "}
                  <span className="font-bold">{upiBankName}</span> UPI
                </p>
                <QRCode value={qrPayload} size={200} style={{ margin: "0 auto" }} />
                <button
                  onClick={handleConfirmOrder}
                  className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Confirm Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
