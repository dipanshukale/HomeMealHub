import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

const router = express.Router();

// Middleware to verify JWT token and attach admin to req.admin
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Authorization token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, 'dummySecret'); // Use your actual secret here

    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) {
      return res.status(401).json({ msg: 'Admin not found' });
    }

    req.admin = admin; // attach admin data to request object
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid or expired token' });
  }
};

// Register
// Register
router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Name, email, and password are required' });
  }

  try {
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Admin already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, phone, password: hashed }); // Add phone here
    await newAdmin.save();

    res.status(201).json({ success: true, msg: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, 'dummySecret', { expiresIn: '1d' }); // token expires in 1 day
    res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Profile (protected route)
router.get('/profile', verifyToken, (req, res) => {
  // req.admin is populated by verifyToken middleware
  res.json({ admin: req.admin });
});

export default router;
