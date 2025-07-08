const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title:        { type: String, required: true },
  description:  { type: String },
  date:         { type: Date, required: true },
  time:         { type: String },
  price:        { type: Number, default: 0 },
  profilePhoto: { type: String },
  club:         { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  createdAt:    { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
