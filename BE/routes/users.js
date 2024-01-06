const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('../config/jwt');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// User login with email and password
// User login with email and password
router.post('/emailLogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.generateToken(user._id);

    // Send the token and user details in the response
    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error in emailLogin:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Get user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Create a new user
router.post('/', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required fields.' });
  }

  try {
    // Check if a user already exists with the provided email
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(409).json({ message: 'User already exists with the provided email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate a JWT token
    const token = jwt.generateToken(savedUser._id);

    // Send the token and user details in the response
    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const getUserProfileByToken=async(token)=>{
  try {
      const userId= jwt.getUserIdFromToken(token)
      console.log(userId)
      const user= await getUserById(userId);
      // user.password=null;
      console.log(user)
      if(!user){
          throw new Error (error.message);
      }
      return user;
  } catch (error) {
      throw new Error (error.message);
  }
}

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
