const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Get every club s in db
router.get('/', async (req, res) => {
  try {
    const clubs = await Club.find()
      .populate('members')
      .populate('leader');
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new club
router.post('/', async (req, res) => {
  try {
    const { name, description, leader, profilePhoto, members } = req.body;

    if (!name || !leader) {
      return res.status(400).json({ error: 'Name and leader are required' });
    }

    const club = new Club({
      name,
      description,
      leader,
      profilePhoto,
      members
    });

    await club.save();
    res.status(201).json(club);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



module.exports = router;