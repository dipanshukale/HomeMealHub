import express from "express";
import Order from "../models/order.js";
import MenuItem from "../models/MenuItem.js";
import nodemailer from "nodemailer"; // For email notifications

const router = express.Router();

router.post("/checkoutOrder", async (req, res) => {
  console.log("Starting Data of Customer:", req.body);

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
      address,
      phone,
      cartItems,
      totalAmount,
      shipping,
      gst,
      grandTotal,
    });

    await newOrder.save();
    console.log("Order Summary of Customer:", req.body);

    // ✅ Notify vendors whose dishes were purchased
    for (let item of cartItems) {
      const menuItem = await MenuItem.findOne({ name: item.name });

      if (menuItem && menuItem.vendorEmail) {
        // Send email to vendor
        sendVendorNotificationEmail(menuItem.vendorEmail, item.name);
      }
    }

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error("Order saving error:", err);
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
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    console.log(orders);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
});

// ✅ Email Notification Function
function sendVendorNotificationEmail(toEmail, dishName) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourappemail@gmail.com", // ✅ your sender email
      pass: "yourapppassword", // ✅ your email app password (not normal password)
    },
  });

  const mailOptions = {
    from: "yourappemail@gmail.com",
    to: toEmail,
    subject: "New Order Alert - HomeMealHub",
    html: `<h3>Your dish <strong>${dishName}</strong> has been purchased!</h3>
           <p>Please check your dashboard for more details.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error("Error sending vendor email:", error);
    }
    console.log("Vendor notification email sent:", info.response);
  });
}

export default router;
