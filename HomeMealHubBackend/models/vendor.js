import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String,
  dishImage: String
});

const Vendor =  mongoose.model('Vendor', vendorSchema);

export default Vendor;
