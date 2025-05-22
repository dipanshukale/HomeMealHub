import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String }, // <-- Add this line
  password: { type: String, required: true },
});

export default mongoose.model('Admin', AdminSchema);
