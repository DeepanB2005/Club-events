const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'] },
  dob: { type: Date, required: true },
  year: { type: String, required: true },
  department: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

// user name ,email,pass,conform pass,gender,dob,year,department,phone no,
