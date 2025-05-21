import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  cartItems: [
    {
      title: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  shipping: Number,
  gst: Number,
  grandTotal: Number,
 status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Preparing", "Ready To Pick", "Out Of Delivery", "Delivered", "Cancelled"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
