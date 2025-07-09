const express = require('express');
const router = express.Router();
const Event = require('../models/Events');

// Create a new event
router.post('/', async (req, res) => {
  try {
    const { title, description, date, price, time, profilePhoto, club } = req.body;
    if (!title || !date || !club) {
      return res.status(400).json({ error: 'Title, date, and club are required.' });
    }
    const event = new Event({
      title,
      description,
      date,
      time, // Now this will be saved
      price,
      profilePhoto,
      club
    });
    await event.save();
    res.status(201).json({ message: 'Event created', event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('club');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get events for a specific club
router.get('/club/:clubId', async (req, res) => {
  try {
    const events = await Event.find({ club: req.params.clubId }).populate('club');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an event
router.patch('/:eventId', async (req, res) => {
  try {
    const { title, description, date, time, price, profilePhoto, club } = req.body;
    const updateFields = {};
    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (date !== undefined) updateFields.date = date;
    if (time !== undefined) updateFields.time = time;
    if (price !== undefined) updateFields.price = price;
    if (profilePhoto !== undefined) updateFields.profilePhoto = profilePhoto;
    if (club !== undefined) updateFields.club = club;

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventId,
      { $set: updateFields },
      { new: true }
    ).populate('club');

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ message: 'Event updated', event: updatedEvent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;