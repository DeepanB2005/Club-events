const express = require('express');
const router = express.Router();
const Club = require('../models/Club');

// Get every club in db
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

// Get a single club by ID
router.get('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id)
      .populate('members')
      .populate('leader')
      .populate('events');
    
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }
    
    res.json(club);
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

// Update a club by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, description, leader, profilePhoto, members } = req.body;
    
    // Find the club first to check if it exists
    const existingClub = await Club.findById(req.params.id);
    if (!existingClub) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Update the club
    const updatedClub = await Club.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        leader,
        profilePhoto,
        members
      },
      { 
        new: true, // Return the updated document
        runValidators: true // Run schema validations
      }
    ).populate('members').populate('leader');

    res.json({
      message: 'Club updated successfully',
      club: updatedClub
    });

  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Club name already exists' });
    }
    
    res.status(500).json({ error: err.message });
  }
});

// Delete a club by ID
router.delete('/:id', async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    await Club.findByIdAndDelete(req.params.id);
    
    res.json({ 
      message: 'Club deleted successfully',
      deletedClub: {
        id: club._id,
        name: club.name
      }
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a member to a club
router.post('/:id/members', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Check if user is already a member
    if (club.members.includes(userId)) {
      return res.status(400).json({ error: 'User is already a member of this club' });
    }

    club.members.push(userId);
    await club.save();

    const updatedClub = await Club.findById(req.params.id)
      .populate('members')
      .populate('leader');

    res.json({
      message: 'Member added successfully',
      club: updatedClub
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a member from a club
router.delete('/:id/members/:userId', async (req, res) => {
  try {
    const { id, userId } = req.params;

    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Check if user is a member
    if (!club.members.includes(userId)) {
      return res.status(400).json({ error: 'User is not a member of this club' });
    }

    club.members = club.members.filter(member => member.toString() !== userId);
    await club.save();

    const updatedClub = await Club.findById(id)
      .populate('members')
      .populate('leader');

    res.json({
      message: 'Member removed successfully',
      club: updatedClub
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;