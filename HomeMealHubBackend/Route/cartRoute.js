// routes/cartRoutes.js
import express from 'express';
import Cart from '../models/cart.js';

const router = express.Router();

// Get Cart items for a user
router.get('/cart/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add item to the cart
router.post('/cart/add', async (req, res) => {
  const { userId, title, img, price, desc } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ title, img, price, desc, quantity: 1 }],
      });
      await cart.save();
      return res.json(cart);
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(item => item.title === title);

    if (!existingItem) {
      cart.items.push({ title, img, price, desc, quantity: 1 });
    } else {
      existingItem.quantity += 1; // Increment quantity if item exists
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item quantity
router.put('/update', async (req, res) => {
  const { userId, itemId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item._id.toString() === itemId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove item from the cart
router.delete('/cart/remove/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const updatedItems = cart.items.filter(item => item._id.toString() !== itemId);
    cart.items = updatedItems;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
