import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String,
  dishImage: String
});

export default mongoose.model('Vendor', vendorSchema);
