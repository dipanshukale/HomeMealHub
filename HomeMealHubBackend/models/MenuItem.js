// models/MenuItem.js
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String, // from Cloudinary
  isVendorDish: {
    type: Boolean,
    default: true,
  }
});

export default mongoose.model('MenuItem', menuItemSchema);
