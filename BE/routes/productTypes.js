const express = require('express');
const router = express.Router();
const ProductType = require('../models/ProductType');
const Brand = require('../models/Brand');
const Department= require('../models/Department.js')

// Get all product types
router.get('/', async (req, res) => {
  try {
    const productTypes = await ProductType.find();
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product type by ID
router.get('/:id', getProductType, (req, res) => {
  res.json(res.productType);
});
// Get product type by deparementID
router.get('/depart/:departmentId', async (req, res) => {
  try {
  console.log(req.params)
    const productTypes = await ProductType.find({department:req.params.departmentId});
    res.json(productTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product type
router.post('/', async (req, res) => {
  const { name, department,img } = req.body;
console.log(req.body);
  if (!name || !department) {
    return res.status(400).json({ message: 'Name and Department are required fields.' });
  }

  try {
    const departmentExists = await Department.findById(department);

    if (!departmentExists) {
      return res.status(404).json({ message: 'Department not found.' });
    }

    const newProductType = new ProductType({
      name,
      department,
      img
    });

    const savedProductType = await newProductType.save();
    res.status(201).json(savedProductType);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getProductType(req, res, next) {
  let productType;
  try {
    productType = await ProductType.findById(req.params.id).populate('subcategories');
    if (!productType) {
      return res.status(404).json({ message: 'Product Type not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.productType = productType;
  next();
}

async function getProductTypesByDepartment(req, res, next) {
  console.log("hello")
  let productTypes;
  try {
    const { departmentId } = req.params.id;
    console.log(departmentId)
     productTypes = await ProductType.find({ department: departmentId });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  res.productTypes=productType;
  next();

};

module.exports = router;
