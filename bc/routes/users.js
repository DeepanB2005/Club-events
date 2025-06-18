const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const users = await User.find();//get all users
  res.json(users);
});

// Get a single user by roll number
router.get('/rollNo/:rollNo', async (req, res) => {
  try {
    const user = await User.findOne({ rollNo: req.params.rollNo });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { username,rollNo, email, password,gender,dob,year,department,phoneNo } = req.body;
    const user = new User({ username,rollNo, email, password,gender,dob,year,department,phoneNo });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;


