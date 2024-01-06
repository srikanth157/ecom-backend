// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Route to create a new order
router.post('/create', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      email,
      phoneNumber,
      userId,
      // Add other fields as needed for your order details
    } = req.body;

    const newOrder = new Order({
      firstName,
      lastName,
      address,
      city,
      postalCode,
      email,
      phoneNumber,
      userId,
      // Add other fields as needed for your order details
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all orders
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get orders by userId
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by userId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
