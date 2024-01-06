const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    text: true, // Enable text indexing
  },
  img:String,
  productType: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
  // other fields as needed
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
