const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    text: true, // Enable text indexing
  },
  img:String,
  price: Number,
  description: String,
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  // other fields as needed
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
