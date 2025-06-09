import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoute from "./Route/contactRoute.js";
import vendorRoute from "./Route/vendorRoute.js";
import cartRoute from "./Route/cartRoute.js";
import orderRoute from "./Route/orderRoute.js";
import adminAuthRoutes from './Route/AuthRoute.js';
import menuRoute from "./Route/menuRoute.js"; 
import connectDB from "./Database/Connection.js";
import { config } from "dotenv";

// Load env
config({ path: "./config.env" });

// Initialize
const app = express();
const PORT = process.env.PORT || 8000;

// Connect DB
connectDB();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use("/api", contactRoute);
app.use("/api/vendor", vendorRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/menuitems", menuRoute); 

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
