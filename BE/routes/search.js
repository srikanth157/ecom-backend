// routes/search.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Department = require('../models/Department');
const ProductType = require('../models/ProductType');
const Brand = require('../models/Brand');

// Search endpoint
router.get('/', async (req, res) => {
  const query = req.query.q;
console.log(query)
  try {
    // Search across products, departments, product types, and brands
    const [products, departments, productTypes, brands] = await Promise.all([
      Product.find({ $text: { $search: query } }),
      Department.find({ $text: { $search: query } }),
      ProductType.find({ $text: { $search: query } }),
      Brand.find({ $text: { $search: query } }),
    ]);

    res.json({ products, departments, productTypes, brands });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
