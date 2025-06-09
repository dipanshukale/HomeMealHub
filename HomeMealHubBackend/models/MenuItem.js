import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String, 
  isVendorDish: {
    type: Boolean,
    default: true,
  },
  vendorEmail: {
    type: String,
    required: true, 
  }
});

export default mongoose.model('MenuItem', menuItemSchema);
