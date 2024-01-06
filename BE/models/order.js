const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  postalCode: String,
  email: String,
  phoneNumber: String,
  // Add other fields as needed for your order details
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
