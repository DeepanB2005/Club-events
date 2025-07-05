const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from response
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single user by roll number
router.get('/rollNo/:rollNo', async (req, res) => {
  try {
    const user = await User.findOne({ rollNo: req.params.rollNo.toUpperCase() }).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add this to your users.js router
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// filepath: bc/routes/users.js
//getus
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
    console.log("getting user name")
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new user (signup)
router.post('/', async (req, res) => {
  try {
    console.log('Received signup data:', req.body);
    
    const { username, rollNo, role, email, password, gender, dob, year, department, phoneNo } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { rollNo: rollNo.toUpperCase() }
      ]
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        error: existingUser.email === email.toLowerCase() 
          ? 'Email already registered' 
          : 'Roll number already registered' 
      });
    }
    
    // Create new user
    const user = new User({ 
      username, 
      rollNo: rollNo.toUpperCase(), 
      role: role || 'student', // Default role to student if not provided
      email: email.toLowerCase(), 
      password, 
      gender: gender.toLowerCase(), 
      dob, 
      year, 
      department, 
      phoneNo 
    });
    
    await user.save();
    
    // Return user without password
    const userResponse = user.toObject();
    delete userResponse.password;
    
    console.log('User created successfully:', userResponse);
    res.status(201).json({ 
      message: 'User created successfully',
      user: userResponse 
    });
    
  } catch (err) {
    console.error('Signup error:', err);
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    // Handle duplicate key errors
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ error: `${field} already exists` });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route (basic implementation)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ 
      message: 'Login successful',
      user: userResponse 
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;