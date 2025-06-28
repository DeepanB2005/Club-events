const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name:        { type: String, required: true, unique: true },
  description: { type: String },
  leader:      { type: String },
  members:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  events:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Club', clubSchema);