import React, { useState } from "react";

const MenuPage = ({ deliveryStatus }) => {
  const menuItems = [
    { id: 1, name: "Healthy Veggie Bowl", price: 159, calories: "450" },
    { id: 2, name: "Grilled Chicken Salad", price: 199, calories: "380" },
    { id: 3, name: "Quinoa Power Meal", price: 229, calories: "420" },
    { id: 4, name: "Salmon & Greens", price: 149, calories: "500" }
  ];

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#FFF1D5] p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className={`p-4 rounded-lg mb-8 ${
          deliveryStatus.type === "delivery"
            ? "bg-[#F17228] text-white"
            : "bg-[#FFB30E] text-black"
        }`}>
          <h2 className="text-xl font-bold">
            {deliveryStatus.type === "delivery"
              ? "🚚 Delivery to:"
              : "🛍️ Pickup Address:"}
          </h2>
          <p>{deliveryStatus.location}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-1 bg-white text-[#F17228] rounded text-sm cursor-pointer"
          >
            Change Location
          </button>
        </div>

        <h1 className="text-3xl font-bold text-[#F17228] mb-6">Our Healthy Menu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">image file</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#F17228]">{item.name}</h3>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-700">₹{item.price.toFixed(2)}</span>
                  <span className="text-gray-500">{item.calories} cal</span>
                </div>
                <button
                  className="w-full mt-4 bg-[#F17228] text-white py-2 rounded-lg hover:bg-[#e16523] cursor-pointer transition-colors"
                  onClick={() => addToCart(item)}
                >
                  Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-[#F17228] mb-4">Your Order</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">No items selected yet</p>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between border-b pb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
          <button
            className="w-full bg-[#F17228] cursor-pointer text-white py-3 rounded-lg text-lg hover:bg-[#e16523] transition-colors mt-4"
            disabled={cartItems.length === 0}
          >
            {deliveryStatus.type === "delivery"
              ? "Proceed to Delivery"
              : "Proceed to Pickup"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
