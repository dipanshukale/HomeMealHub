import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Vendor from "../models/vendor.js";

const router = express.Router();

// ✅ Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "dpnh5nu9x",
  api_key: "764152513891214",
  api_secret: "St7X6YiSRgSUsKnA02y-saJ-FoY",
});

// ✅ Setup Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "HomeMealHub",
    format: async () => "jpeg", 
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const upload = multer({ storage: storage });

// ✅ POST /vendordata - Submit Vendor Form
router.post("/vendordata", upload.single("dishImage"), async (req, res) => {
  try {
    const { name, email, phone, description, dishName, price } = req.body;

    const result = await cloudinary.v2.uploader.upload(req.file.path);
  
    const newVendor = new Vendor({
      name,
      email,
      phone,
      description,
      dishName,
      price,
      dishImage: result.secure_url,
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor data saved successfully." });
  } catch (error) {
    console.error("Error in /vendordata:", error);
    res.status(500).json({ message: "Failed to save vendor data." });
  }
});

// ✅ GET /data - Fetch All Vendors
router.get("/data", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendor data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ DELETE /delete/:id - Delete Vendor
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
