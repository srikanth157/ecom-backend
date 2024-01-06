const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const ProductType = require('../models/ProductType');

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    console.log(departments)
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get department by ID
router.get('/:id', getDepartment, (req, res) => {
  res.json(res.department);
});

// Create a new department
router.post('/', async (req, res) => {
  const { name,img } = req.body;
console.log(req.body)
  if (!name) {
    return res.status(400).json({ message: 'Name is a required field.' });
  }

  try {
    const newDepartment = new Department({
      name,
      img
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getDepartment(req, res, next) {
  let department;
  try {
    department = await Department.findById(req.params.id).populate('subcategories');
    if (!department) {
      return res.status(404).json({ message: 'Department not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.department = department;
  next();
}

module.exports = router;
