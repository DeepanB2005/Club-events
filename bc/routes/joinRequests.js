const express = require('express');
const router = express.Router();
const JoinRequest = require('../models/JoinRequest');
const Club = require('../models/Club');

// Create a join request for a specific club
router.post('/:clubId/join-request', async (req, res) => {
  try {
    const { userId } = req.body;
    const { clubId } = req.params;
    
    const club = await Club.findById(clubId);
    if (!club) return res.status(404).json({ error: 'Club not found' });

    // Check if request already exists
    const existing = await JoinRequest.findOne({ club: clubId, user: userId, status: 'pending' });
    if (existing) return res.status(400).json({ error: 'Join request already sent.' });

    // Check if user is already a member
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

// Get all join requests for a specific club
router.get('/club/:clubId', async (req, res) => {
  try {
    console.log(`Fetching join requests for club: ${req.params.clubId}`);
    
    const requests = await JoinRequest.find({ club: req.params.clubId })
      .populate('user', '-password')
      .populate('club', 'name')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${requests.length} requests for club ${req.params.clubId}`);
    res.json(requests);
  } catch (err) {
    console.error('Error fetching join requests:', err);
    res.status(500).json({ error: err.message });
  }
});

// Update a join request (approve/reject)
router.patch('/:requestId', async (req, res) => {
  try {
    const { status } = req.body;
    console.log(`Updating request ${req.params.requestId} to status: ${status}`);
    
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "approved" or "rejected"' });
    }

    const request = await JoinRequest.findById(req.params.requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    // Update request status
    request.status = status;
    await request.save();

    // If approved, add user to club members
    if (status === 'approved') {
      const club = await Club.findById(request.club);
      if (club && !club.members.includes(request.user)) {
        club.members.push(request.user);
        await club.save();
        console.log(`Added user ${request.user} to club ${club.name}`);
      }
    }

    console.log(`Request ${status} successfully`);
    res.json({ 
      message: `Request ${status} successfully`,
      request: {
        ...request.toObject(),
        status
      }
    });
  } catch (err) {
    console.error('Error updating request:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all join requests for clubs where user is a leader
router.get('/leader/:leaderId', async (req, res) => {
  try {
    console.log(`Fetching requests for leader: ${req.params.leaderId}`);
    
    // Find all clubs where this user is the leader
    const clubs = await Club.find({ leader: req.params.leaderId }).select('_id name');
    const clubIds = clubs.map(c => c._id);

    console.log(`Leader manages ${clubs.length} clubs:`, clubs.map(c => c.name));

    if (clubIds.length === 0) {
      return res.json([]);
    }

    // Find all join requests for these clubs
    const requests = await JoinRequest.find({ club: { $in: clubIds } })
      .populate('user', '-password')
      .populate('club', 'name')
      .sort({ createdAt: -1 });

    // Attach club name to each request for frontend convenience
    const requestsWithClubName = requests.map(req => ({
      ...req.toObject(),
      clubName: req.club?.name || '',
      clubId: req.club?._id || '',
    }));

    console.log(`Found ${requestsWithClubName.length} total requests for leader`);
    res.json(requestsWithClubName);
  } catch (err) {
    console.error('Error fetching leader requests:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;