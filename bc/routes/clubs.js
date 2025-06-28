const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Get every club s in db
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find().populate('members');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Create a new club
router.post('/', async (req, res) => {
  try {
    const { name, description, members, profilePhoto } = req.body;
    const club = new Club({ name, description, members, profilePhoto });
    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;