const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // user_id: {type: Number, required: true, unique: true},
  username: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = new mongoose.model('User', userSchema);