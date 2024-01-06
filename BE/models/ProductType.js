const mongoose = require('mongoose');

const productTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true, // Enable text indexing
  },
  img:String,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }],
  // other fields as needed
});

const ProductType = mongoose.model('ProductType', productTypeSchema);

module.exports = ProductType;
