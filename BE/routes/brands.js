const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');
const ProductType = require('../models/ProductType');

// Get all brands
router.get('/', async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get brand by ID
router.get('/:id', getBrand, (req, res) => {
  res.json(res.brand);
});

// Get brands type by deparementID
router.get('/br/:productType', async (req, res) => {
  try {
  console.log(req.params)
    const productTypes = await Brand.find({productType:req.params.productType});
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new brand
router.post('/', async (req, res) => {
  const { name, productType ,img} = req.body;

  if (!name || !productType) {
    return res.status(400).json({ message: 'Name and Product Type are required fields.' });
  }

  try {
    const productTypeExists = await ProductType.findById(productType);

    if (!productTypeExists) {
      return res.status(404).json({ message: 'Product Type not found.' });
    }

    const newBrand = new Brand({
      name,
      productType,
      img
    });

    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getBrand(req, res, next) {
  let brand;
  try {
    brand = await Brand.findById(req.params.id).populate('productType');
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.brand = brand;
  next();
}

module.exports = router;
