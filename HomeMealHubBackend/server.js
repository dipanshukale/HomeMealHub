import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRoute from "./Route/contactRoute.js";
import vendorRoute from "./Route/vendorRoute.js";
import connectDB from "./Database/Connection.js";
import { config } from "dotenv";


// dotenv.config();
config({ path: "./config.env" });
// Initialize app
const app = express();
const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();

// Middleware
app.use(
	cors({
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// Routes
app.use("/api", contactRoute);
app.use("/api/vendor", vendorRoute);

// Server start
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});
