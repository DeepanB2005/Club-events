const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const JoinRequest = require('../models/JoinRequest'); // Add this at the top

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

// Add a member to a club
router.post('/:id/members', async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Example for all routes using req.params.id:
    const clubId = req.params.id.trim();
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Check if user is already a member
    if (club.members.includes(userId)) {
      return res.status(400).json({ error: 'User is already a member of this club' });
    }

    club.members.push(userId);
    await club.save();

    const updatedClub = await Club.findById(clubId)
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

// Get a single club by ID - MOVED TO END
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



router.put('/:id', async (req, res) => {
  try {
    const { name, description, leader, profilePhoto } = req.body;
    const clubId = req.params.id.trim();

    
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Check if name is being changed and if it already exists
    if (name && name !== club.name) {
      const existingClub = await Club.findOne({ name: name });
      if (existingClub) {
        return res.status(400).json({ error: 'Club name already exists' });
      }
    }

    // Update only the fields that are provided
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (leader !== undefined) updateData.leader = leader;
    if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto;

    // Update the club
    const updatedClub = await Club.findByIdAndUpdate(
      clubId,
      updateData,
      { new: true, runValidators: true }
    )
    .populate('members')
    .populate('leader');

    res.json({
      message: 'Club updated successfully',
      club: updatedClub
    });

  } catch (err) {
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

    res.status(500).json({ error: err.message });
  }
});


router.patch('/:id', async (req, res) => {
  try {
    const clubId = req.params.id.trim();
    const updates = req.body;

    // Find the club first
    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({ error: 'Club not found' });
    }

    // Check if name is being changed and if it already exists
    if (updates.name && updates.name !== club.name) {
      const existingClub = await Club.findOne({ name: updates.name });
      if (existingClub) {
        return res.status(400).json({ error: 'Club name already exists' });
      }
    }

    // Update the club with only the provided fields
    const updatedClub = await Club.findByIdAndUpdate(
      clubId,
      updates,
      { new: true, runValidators: true }
    )
    .populate('members')
    .populate('leader');
    // Remove .populate('events') until Event model is created

    res.json({
      message: 'Club updated successfully',
      club: updatedClub
    });

  } catch (err) {
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

    res.status(500).json({ error: err.message });
  }
});

// Club join request (student requests to join, leader receives request)
router.post('/:id/join-request', async (req, res) => {
  try {
    const { userId } = req.body;
    const clubId = req.params.id.trim();

    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ error: 'Club not found' });

    
    const existing = await JoinRequest.findOne({ club: clubId, user: userId, status: 'pending' });
    if (existing) return res.status(400).json({ error: 'Join request already sent.' });

    
    if (club.members.includes(userId)) {
      return res.status(400).json({ error: 'You are already a member of this club.' });
    }

    const joinRequest = new JoinRequest({ club: clubId, user: userId });
    await joinRequest.save();

    res.status(201).json({ message: 'Join request sent to club leader!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/club/:clubId', async (req, res) => {
  try {
    const requests = await JoinRequest.find({ club: req.params.clubId })
      .populate('user', '-password')
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;