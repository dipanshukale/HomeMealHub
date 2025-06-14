import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

router.post('/contacts', async (req, res) => {
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
router.get('/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ date: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;
