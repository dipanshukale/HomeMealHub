import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    console.log("Name Of Customer : ", name);
    console.log("Email of Customer : ", email);
    console.log("Subject of Customer: ", subject);
    console.log("Message of Customer: ", message);

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Server error. Try again later.' });
  }
});

export default router;