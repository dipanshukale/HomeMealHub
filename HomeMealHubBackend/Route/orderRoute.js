import express from "express";
import Order from "../models/order.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, phone, address, cartItems, totalAmount, shipping, gst, grandTotal } = req.body;

  if (!name || !phone || !address || !cartItems || !totalAmount || !grandTotal) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newOrder = new Order({
      name,
      phone,
      address,
      cartItems,
      totalAmount,
      shipping,
      gst,
      grandTotal,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order saving error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
