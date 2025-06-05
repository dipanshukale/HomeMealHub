import express from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Vendor from "../models/vendor.js"

const router = express.Router();

cloudinary.v2.config({
	cloud_name: "dpnh5nu9x",
	api_key: "764152513891214",
	api_secret: "St7X6YiSRgSUsKnA02y-saJ-FoY",
});


const storage = new CloudinaryStorage({
	cloudinary: cloudinary.v2,
	params: {
		folder: "HomeMealHub",
		format: async (req, file) => "jpeg",
		public_id: (req, file) => Date.now() + "-" + file.originalname,
	},
});

const upload = multer({ storage: storage });
// 
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// 
// const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
    // cb(null, "uploads/");
  // },
  // filename: function (req, file, cb) {
    // const ext = path.extname(file.originalname);
    // const name = `${Date.now()}-${file.originalname}`;
    // cb(null, name);
  // },
// });
// 
// const upload = multer({
  // storage: storage,
  // limits: { fileSize: 5 * 1024 * 1024 },
  // fileFilter: (req, file, cb) => {
    // if (file.mimetype.startsWith("image/")) cb(null, true);
    // else cb(new Error("Only image files are allowed"));
  // },
// });


router.post("/vendordata", upload.single("dishImage"), async (req, res) => {
  try {

    console.log("BODY : ", req.body);
    console.log("FILE : ", req.file);

    const { name, email, phone, description } = req.body;
    const result = await cloudinary.uploader.upload(req.file.path);

    const newVendor = new Vendor({
      name,
      email,
      phone,
      description,
      dishImage: result.secure_url, 
    });

    console.log(newVendor);

    await newVendor.save();
    res.status(201).json({ message: "Vendor data saved successfully."});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to save vendor data." });
  }
});

router.get("/data", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
    console.log("vendor data is here!")
    console.log(vendors);
  } catch (error) {
    console.error('Error fetching vendor data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const vendorId = req.params.id;

  try {
    const deletedVendor = await Vendor.findByIdAndDelete(vendorId);

    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    return res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});
export default router;