const express = require('express');
const router = express.Router();
const JoinRequest = require('../models/JoinRequest');
const Club = require('../models/Club');


router.post('/:clubId/join-request', async (req, res) => {
  try {
    const { userId } = req.body;
    const { clubId } = req.params;
    
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

router.patch('/:requestId', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const request = await JoinRequest.findById(req.params.requestId);
    if (!request) return res.status(404).json({ error: 'Request not found' });

    request.status = status;
    await request.save();

    if (status === 'approved') {
      const club = await Club.findById(request.club);
      if (!club.members.includes(request.user)) {
        club.members.push(request.user);
        await club.save();
      }
    }

    res.json({ message: `Request ${status}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;