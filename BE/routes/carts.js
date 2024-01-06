const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const jwt = require('../config/jwt');

// Get the user's cart
router.get('/', jwt.verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    res.json(cart || { products: [] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a product to the user's cart
router.post('/add', jwt.verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid product or quantity.' });
  }

  try {
    const userId = req.userId;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(p => p.product == productId);

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update the quantity
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Add the product to the cart
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the quantity of a product in the user's cart
router.patch('/update/:productId', jwt.verifyToken, async (req, res) => {
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ message: 'Invalid quantity.' });
  }

  try {
    const userId = req.userId;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const existingProductIndex = cart.products.findIndex(p => p.product == req.params.productId);

    if (existingProductIndex !== -1) {
      // Update the quantity of the existing product in the cart
      cart.products[existingProductIndex].quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Product not found in the cart.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a product from the user's cart
router.delete('/remove/:productId', jwt.verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId)
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const updatedProducts = cart.products.filter(p => p.product != req.params.productId);
    cart.products = updatedProducts;

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
