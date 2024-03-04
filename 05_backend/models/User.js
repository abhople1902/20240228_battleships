const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // user_id: {type: Number, required: true, unique: true},
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {type: String},
  gamesWon: {type: Number, default: 0},
  totalGamesPlayed: {type: Number, default: 0},
  friends: [{type: mongoose.Schema.Types.ObjectId, ref:'User'}]
});

module.exports = new mongoose.model('User', userSchema);