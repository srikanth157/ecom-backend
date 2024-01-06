const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const ProductType = require('../models/ProductType');
const Brand = require('../models/Brand')

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Get products type by 
router.get('/pr/:brand', async (req, res) => {
  try {
  console.log(req.params)
    const productTypes = await Product.find({brand:req.params.brand});
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  const { name, brand,price,description,img } = req.body;

  if (!name || !brand) {
    return res.status(400).json({ message: 'Name and Product Type are required fields.' });
  }

  try {
    const productTypeExists = await Brand.findById(brand);
console.log(productTypeExists)
    if (!productTypeExists) {
      return res.status(404).json({ message: 'Product Type not found.' });
    }

    const newProduct = new Product({
      name,
      brand,
      price,
      description,
      img
      // other fields as needed
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getProduct(req, res, next) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.product = product;
  next();
}

module.exports = router;
