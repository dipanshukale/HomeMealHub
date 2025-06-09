import express from "express";
import Order from "../models/order.js";
import MenuItem from "../models/MenuItem.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

function sendVendorNotificationEmail(toEmail, dishName, customerName, customerAddress) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: "New Order Alert - HomeMealHub",
    html: `
      <div style="font-family: sans-serif; padding: 10px;">
        <h2 style="color: #E91E63;">🍽️ HomeMealHub - Dish Purchased</h2>
        <p>Your dish <strong>${dishName}</strong> was just purchased by <strong>${customerName}</strong>.</p>
        <p><strong>Delivery Address:</strong> ${customerAddress}</p>
        <p>Please check your vendor dashboard and start preparing the order.</p>
        <hr/>
        <small>This is an automated message from HomeMealHub.</small>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending vendor email:", error);
    } else {
      console.log("Vendor notification email sent:", info.response);
    }
  });
}


router.post("/checkoutOrder", async (req, res) => {
  const {
    name,
    phone,
    address,
    cartItems,
    totalAmount,
    shipping,
    gst,
    grandTotal,
  } = req.body;

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
    console.log("✅ Order saved:", newOrder);

    for (let item of cartItems) {
      const menuItem = await MenuItem.findOne({ name: item.title }); 

      if (menuItem && menuItem.vendorEmail) {
        sendVendorNotificationEmail(
          menuItem.vendorEmail,
          item.title,
          name,
          address
        );
      }
    }

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("❌ Order saving error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


router.put("/:orderId/status", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error("❌ Fetch orders error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
