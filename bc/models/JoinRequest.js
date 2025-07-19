const mongoose = require('mongoose');

const joinRequestSchema = new mongoose.Schema({
  club:    { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status:  { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JoinRequest', joinRequestSchema);
