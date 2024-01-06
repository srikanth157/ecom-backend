const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true,
    text: true, // Enable text indexing
  },
  img:String,
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' }],
  // other fields as needed
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
