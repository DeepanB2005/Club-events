const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Get all clubs
router.get('/', async (req, res) => {
  const clubs = await Club.find().populate('members');
  res.json(clubs);
});

module.exports = router;